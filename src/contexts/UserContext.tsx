// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export type UserType = 'homeowner' | 'professional';

export interface UserProfile {
  id: string;
  user_id: string;
  email: string;
  user_type: UserType;
  created_at: string;
  updated_at: string;
  [key: string]: any;
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
  setUserType: (type: UserType) => Promise<void>;
  signIn: (email: string, password: string) => Promise<AuthResponse>;
  signUp: (email: string, password: string, userType: UserType, profileData?: ProfileUpdateData) => Promise<AuthResponse>;
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

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single();
      if (error) throw error;
      setProfile(data);
      if (data?.user_type) {
        setUserTypeState(data.user_type as UserType);
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
          await fetchProfile(session.user.id);
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError('Failed to initialize auth');
      } finally {
        setLoading(false);
      }
    };

    initAuth();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user as AuthUser);
        await fetchProfile(session.user.id);
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

  const updateProfile = async (updates: ProfileUpdateData) => {
    try {
      setLoading(true);
      if (!user) throw new Error('No user logged in');
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .select()
        .single();
      if (error) throw error;
      setProfile(data);
      if (data.user_type) {
        setUserTypeState(data.user_type as UserType);
      }
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const setUserType = async (type: UserType): Promise<void> => {
    if (!user) {
      throw new Error('No user logged in');
    }

    try {
      const { error } = await supabase
        .from('profiles')
        .update({ 
          user_type: type,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) throw error;
      setUserTypeState(type);
    } catch (error) {
      console.error('Error setting user type:', error);
      toast.error('Failed to set user type');
      throw error;
    }
  };

  const signIn = async (email: string, password: string): Promise<AuthResponse> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      if (data.user) {
        await fetchProfile(data.user.id);
      }

      return { success: true, message: 'Successfully signed in', data };
    } catch (error) {
      console.error('Error signing in:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to sign in' 
      };
    }
  };

  const signUp = async (
    email: string, 
    password: string, 
    userType: UserType, 
    profileData?: ProfileUpdateData
  ): Promise<AuthResponse> => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) throw authError;

      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({ 
            ...profileData, 
            user_id: authData.user.id,
            email,
            user_type: userType,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });

        if (profileError) throw profileError;
        setUserTypeState(userType);

        return { 
          success: true, 
          message: 'Successfully signed up. Please check your email for confirmation.',
          data: authData 
        };
      }

      throw new Error('Failed to create user');
    } catch (error) {
      console.error('Error signing up:', error);
      return { 
        success: false, 
        message: error instanceof Error ? error.message : 'Failed to sign up' 
      };
    }
  };

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
        loginWithOTP
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
