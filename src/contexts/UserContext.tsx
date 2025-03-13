import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { sendConfirmationEmail, sendWelcomeEmail } from '../services/emailService';

export type UserType = 'homeowner' | 'professional';

export interface UserProfile {
  id: string; // PK in profiles
  user_type: UserType;
  email: string;
  first_name?: string;
  last_name?: string;
  phone?: string;
  postcode?: string;
  company_name?: string;
  business_registration_number?: string;
  trade?: string;
  created_at?: string;
  updated_at?: string;
}

export type AuthResponse = {
  success: boolean;
  message: string;
  data?: any;
};

export type ProfileUpdateData = Partial<UserProfile>;

export interface AuthUser extends SupabaseUser {
  profile?: UserProfile;
}

export interface UserContextProps {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  userType: UserType | null;
  isAuthenticated: boolean;

  updateProfile: (updates: ProfileUpdateData) => Promise<void>;
  setUserType: (type: UserType) => void;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (
    email: string,
    password: string,
    userType: UserType,
    profileData?: ProfileUpdateData
  ) => Promise<AuthResponse>;
  signOut: () => Promise<void>;
  loginWithOTP: (email: string, userType: UserType) => Promise<AuthResponse>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userType, setUserTypeState] = useState<UserType | null>(null);

  const navigate = useNavigate();

  // Fetch profile row by matching the "id" column
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      setProfile(data);
      if (data?.user_type) {
        setUserTypeState(data.user_type as UserType);
        localStorage.setItem('lastUserType', data.user_type);
      }
      return data;
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to fetch user profile');
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;
        if (session?.user) {
          setUser(session.user as AuthUser);
          let fetchedProfile = await fetchProfile(session.user.id);
          if (!fetchedProfile) {
            // Create profile if missing on sign in
            const userTypeFromMetadata = session.user.user_metadata?.user_type || 'homeowner';
            if (!session.user.email) {
              throw new Error('User email is missing.');
            }
            const { error: createProfileError } = await supabase.from('profiles').insert({
              id: session.user.id,
              email: session.user.email.toLowerCase(),
              user_type: userTypeFromMetadata,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            });
            if (createProfileError) {
              console.error('Error creating profile on sign in:', createProfileError);
            } else {
              await fetchProfile(session.user.id);
            }
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError('Failed to initialize auth');
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user as AuthUser);
        let fetchedProfile = await fetchProfile(session.user.id);
        if (!fetchedProfile) {
          const userTypeFromMetadata = session.user.user_metadata?.user_type || 'homeowner';
          if (!session.user.email) {
            console.error('User email is missing on auth change.');
            return;
          }
          const { error: createProfileError } = await supabase.from('profiles').insert({
            id: session.user.id,
            email: session.user.email.toLowerCase(),
            user_type: userTypeFromMetadata,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          if (createProfileError) {
            console.error('Error creating profile on auth change:', createProfileError);
          } else {
            await fetchProfile(session.user.id);
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setUserTypeState(null);
        navigate('/');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // updateProfile: filter out user_type updates.
  const updateProfile = async (updates: ProfileUpdateData) => {
    try {
      setLoading(true);
      if (!user) throw new Error('No user logged in');

      const { user_type, ...allowedUpdates } = updates;
      const { data, error } = await supabase
        .from('profiles')
        .update({
          ...allowedUpdates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', user.id)
        .select()
        .single();
      if (error) throw error;
      setProfile(data);
      if (data.user_type) {
        setUserTypeState(data.user_type as UserType);
        localStorage.setItem('lastUserType', data.user_type);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setUserType = (type: UserType) => {
    setUserTypeState(type);
  };

  // signIn: If profile row is missing after successful login, create it.
  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      if (data.user) {
        let fetchedProfile = await fetchProfile(data.user.id);
        if (!fetchedProfile) {
          const userTypeFromMetadata = data.user.user_metadata?.user_type || 'homeowner';
          if (!data.user.email) {
            throw new Error('User email is missing.');
          }
          const { error: createError } = await supabase.from('profiles').upsert({
            id: data.user.id,
            email: data.user.email.toLowerCase(),
            user_type: userTypeFromMetadata,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          });
          if (createError) throw createError;
          fetchedProfile = await fetchProfile(data.user.id);
        }
      }
      return { success: true, message: 'Successfully signed in', data };
    } catch (error) {
      console.error('Error signing in:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to sign in',
      };
    }
  };

  // signUp: Let Supabase Auth handle duplicate emails.
  const signUp = async (
    email: string,
    password: string,
    userType: UserType,
    profileData?: ProfileUpdateData
  ): Promise<AuthResponse> => {
    try {
      const redirectUrl =
        userType === 'homeowner'
          ? `${window.location.origin}/homeowner/email-confirmed`
          : `${window.location.origin}/professional/email-confirmed`;

      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: { user_type: userType },
        },
      });
      if (authError) throw authError;

      // When email confirmation is enabled, authData.session is typically null.
      // If a session exists, immediately upsert profile.
      if (authData.session && authData.user) {
        console.log("Authenticated user id in signUp:", authData.user.id);
        if (!authData.user.email) {
          throw new Error('User email is missing.');
        }
        const { error: profileError } = await supabase.from('profiles').upsert({
          id: authData.user.id,
          email: authData.user.email.toLowerCase(),
          user_type: userType,
          first_name: profileData?.first_name || null,
          last_name: profileData?.last_name || null,
          phone: profileData?.phone || null,
          postcode: profileData?.postcode || null,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });
        if (profileError) throw profileError;

        await sendConfirmationEmail(email.toLowerCase(), userType);
        await sendWelcomeEmail(email.toLowerCase(), userType);

        setUserTypeState(userType);
        localStorage.setItem('lastUserType', userType);
      } else {
        console.log("No active session returned from signUp; waiting for email confirmation.");
      }

      return {
        success: true,
        message: 'Successfully signed up. Please check your email for confirmation.',
        data: authData,
      };
    } catch (error) {
      console.error('Error signing up:', error);
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to sign up',
      };
    }
  };

  // signOut
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
      setUserTypeState(null);
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
      setError('Failed to log out');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // loginWithOTP
  const loginWithOTP = async (email: string, type: UserType): Promise<AuthResponse> => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/${type}/login-otp-callback`,
          data: { user_type: type },
        },
      });
      if (error) return { success: false, message: error.message };
      return { success: true, message: 'Check your email for the magic link' };
    } catch (err: any) {
      console.error('OTP login error:', err);
      return { success: false, message: err.message || 'An error occurred' };
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        loading,
        error,
        userType,
        isAuthenticated: !!user,
        updateProfile,
        setUserType,
        signIn,
        signUp,
        signOut,
        loginWithOTP,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
