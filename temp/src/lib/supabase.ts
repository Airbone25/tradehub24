import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserType = 'homeowner' | 'professional';

export interface UserProfile {
  id: string;
  user_type: UserType;
  full_name: string | null;
  phone: string | null;
  email_verified: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProfessionalProfile {
  id: string;
  company_name: string | null;
  business_address: string | null;
  trade_type: string | null;
  years_experience: number | null;
  license_number: string | null;
  insurance_info: string | null;
  created_at: string;
  updated_at: string;
}

export const signUpWithEmail = async (
  email: string,
  password: string,
  userType: UserType,
  fullName: string
) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          user_type: userType,
          full_name: fullName
        }
      }
    });

    if (error) throw error;

    // Update user profile
    if (data.user) {
      const { error: profileError } = await supabase
        .from('user_profiles')
        .update({
          user_type: userType,
          full_name: fullName
        })
        .eq('id', data.user.id);

      if (profileError) throw profileError;
    }

    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const signInWithOTP = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/verify`
      }
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const verifyOTP = async (email: string, token: string) => {
  try {
    const { data, error } = await supabase.auth.verifyOtp({
      email,
      token,
      type: 'email'
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const signInWithGoogle = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { error: null };
  } catch (error) {
    return { error };
  }
};

export const getCurrentUser = async () => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;

    if (user) {
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) throw profileError;

      return { user: { ...user, profile }, error: null };
    }

    return { user: null, error: null };
  } catch (error) {
    return { user: null, error };
  }
};

export const updateUserProfile = async (
  userId: string,
  updates: Partial<UserProfile>
) => {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};

export const updateProfessionalProfile = async (
  userId: string,
  updates: Partial<ProfessionalProfile>
) => {
  try {
    const { data, error } = await supabase
      .from('professional_profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return { data, error: null };
  } catch (error) {
    return { data: null, error };
  }
};