import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
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
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const fetchUserProfile = async (userId: string) => {
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
      console.error('Error fetching user profile:', err);
      setError('Failed to fetch user profile');
      return null;
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        setLoading(true);
        
        // Get the current session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) throw sessionError;
        
        if (session?.user) {
          setUser(session.user);
          const profile = await fetchUserProfile(session.user.id);
          
          // Redirect to appropriate dashboard based on user type
          if (profile?.user_type === 'homeowner') {
            navigate('/homeowner/dashboard');
          } else if (profile?.user_type === 'professional') {
            navigate('/professional/dashboard');
          }
        }
      } catch (err) {
        console.error('Error initializing auth:', err);
        setError('Failed to initialize authentication');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();

    // Set up auth state listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          await fetchUserProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          navigate('/');
        }
      }
    );

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
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id)
        .select()
        .single();
        
      if (error) throw error;
      
      setProfile(data);
      
    } catch (err) {
      console.error('Error updating profile:', err);
      setError('Failed to update profile');
      throw err;
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
      navigate('/');
    } catch (err) {
      console.error('Error logging out:', err);
      setError('Failed to log out');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <UserContext.Provider 
      value={{ 
        user, 
        profile,
        loading, 
        error,
        userType: profile?.user_type || null,
        isAuthenticated: !!user,
        updateProfile,
        logout 
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
