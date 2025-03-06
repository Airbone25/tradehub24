import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase, UserProfile, getCurrentUser } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  user: (User & { profile?: UserProfile }) | null;
  loading: boolean;
  error: Error | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  error: null
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<(User & { profile?: UserProfile }) | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Initial session check
    const checkUser = async () => {
      try {
        const { user, error } = await getCurrentUser();
        if (error) throw error;
        setUser(user);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN') {
        const { user, error } = await getCurrentUser();
        if (!error && user) {
          setUser(user);
          // Redirect based on user type
          if (user.profile?.user_type === 'homeowner') {
            navigate('/homeowner');
          } else if (user.profile?.user_type === 'professional') {
            navigate('/professional');
          }
        }
      } else if (event === 'SIGNED_OUT') {
        setUser(null);
        navigate('/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  return (
    <AuthContext.Provider value={{ user, loading, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};