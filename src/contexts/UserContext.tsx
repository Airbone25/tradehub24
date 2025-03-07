// src/contexts/UserContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { supabase } from '../services/supabaseClient';
import { UserProfile, UserType } from '../services/authService';
import { useNavigate } from 'react-router-dom';

interface AuthUser extends SupabaseUser {
  profile?: UserProfile;
}

interface UserContextProps {
  user: AuthUser | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  userType: UserType | null;
  isAuthenticated: boolean;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  logout: () => Promise<void>;
  loginWithOTP: (email: string, userType: UserType) => Promise<{ success: boolean; message: string }>;
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
  const [userType, setUserType] = useState<UserType | null>(null);
  const navigate = useNavigate();

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
      if (error) throw error;
      setProfile(data);
      return data;
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to fetch user profile');
      return null;
    }
  };

  const determineUserType = (supabaseUser: SupabaseUser | null, userProfile: UserProfile | null): UserType | null => {
    if (userProfile?.user_type) return userProfile.user_type;
    if (supabaseUser?.user_metadata?.user_type) {
      return supabaseUser.user_metadata.user_type as UserType;
    }
    return null;
  };

  useEffect(() => {
    const initAuth = async () => {
      setLoading(true);
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (session?.user) {
          setUser(session.user);
          const fetchedProfile = await fetchProfile(session.user.id);
          setUserType(determineUserType(session.user, fetchedProfile));
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
        setUser(session.user);
        const fetchedProfile = await fetchProfile(session.user.id);
        setUserType(determineUserType(session.user, fetchedProfile));
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        setProfile(null);
        setUserType(null);
        navigate('/');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const updateProfile = async (updates: Partial<UserProfile>) => {
    try {
      setLoading(true);
      if (!user) throw new Error('No user logged in');
      const { data, error } = await supabase
        .from('profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', user.id)
        .select()
        .single();
      if (error) throw error;
      setProfile(data);
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      setUser(null);
      setProfile(null);
      setUserType(null);
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
      setError('Failed to log out');
    } finally {
      setLoading(false);
    }
  };

  const loginWithOTP = async (email: string, type: UserType) => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
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
        logout,
        loginWithOTP,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
