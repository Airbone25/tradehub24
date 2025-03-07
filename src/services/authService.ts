// src/services/authService.ts
import { supabase } from './supabaseClient';

export type UserType = 'homeowner' | 'professional' | 'admin';

export interface UserProfile {
  id: string;
  user_type: UserType;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  postcode?: string;
  company_name?: string;
  business_registration_number?: string;
  trade?: string;
  created_at?: string;
  updated_at?: string;
}

// --- SIGN UP WITH EMAIL & PASSWORD ---
export async function signUpWithEmail(
  email: string,
  password: string,
  userTypeOrOptions: UserType | { 
    emailRedirectTo?: string;
    data?: Record<string, any>;
  },
  profileData?: Partial<UserProfile>
) {
  try {
    let userType: UserType;
    let options: any = {};

    if (typeof userTypeOrOptions === 'string') {
      // e.g. signUpWithEmail(email, password, 'homeowner')
      userType = userTypeOrOptions as UserType;
      options = {
        emailRedirectTo: `${window.location.origin}/${userType}/login`,
        data: { user_type: userType },
      };
    } else {
      // e.g. signUpWithEmail(email, password, { data: {...} })
      options = userTypeOrOptions;
      userType = options.data?.user_type || 'homeowner';
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: options.emailRedirectTo || `${window.location.origin}/${userType}/login`,
        data: { user_type: userType, ...options.data },
      },
    });
    if (error) throw error;

    // Optionally create a row in "profiles" table
    if (data.user) {
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email,
          user_type: userType,
          ...profileData,
          ...(options.data || {}),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        return { data, error: profileError.message };
      }
    }

    return { data, error: null };
  } catch (err: any) {
    console.error('Sign up error:', err);
    return { data: null, error: err.message };
  }
}

// --- SIGN IN WITH PASSWORD ---
export async function signInWithPassword(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) return { data: null, error: error.message };

    // Optionally confirm user_type from "profiles"
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();
    if (profileError) {
      return { data: null, error: 'Error fetching user profile' };
    }

    return { data: { ...data, profile }, error: null };
  } catch (err: any) {
    console.error('Sign in error:', err);
    return { data: null, error: err.message };
  }
}

// For backward compatibility
export const signInWithEmail = signInWithPassword;

// --- SIGN IN WITH OTP (MAGIC LINK) ---
export async function signInWithOtp(email: string, userType: UserType) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/${userType}/login-otp-callback`,
        data: { user_type: userType },
      },
    });
    if (error) return { data: null, error: error.message };
    return { data, error: null };
  } catch (err: any) {
    console.error('OTP sign in error:', err);
    return { data: null, error: err.message };
  }
}

// --- VERIFY OTP CALLBACK (OPTIONAL) ---
export async function verifyOtpCallback() {
  try {
    const { data, error } = await supabase.auth.getSession();
    if (error) return { data: null, error: error.message };

    if (data.session) {
      return { data: data.session, error: null };
    }
    return { data: null, error: 'No session found' };
  } catch (err: any) {
    console.error('OTP verification error:', err);
    return { data: null, error: err.message };
  }
}

// --- GET CURRENT USER + PROFILE ---
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) return { data: null, error: error.message };
    if (!user) return { data: null, error: 'No user found' };

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    if (profileError) return { data: null, error: profileError.message };

    return { data: { user, profile }, error: null };
  } catch (err: any) {
    console.error('Get user error:', err);
    return { data: null, error: err.message };
  }
}

// --- UPDATE USER PROFILE ---
export async function updateUserProfile(profileData: Partial<UserProfile>) {
  try {
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    if (userError || !user) {
      return { data: null, error: 'User not authenticated' };
    }
    const { data, error } = await supabase
      .from('profiles')
      .update({
        ...profileData,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)
      .select();
    if (error) return { data: null, error: error.message };
    return { data: data[0], error: null };
  } catch (err: any) {
    console.error('Update profile error:', err);
    return { data: null, error: err.message };
  }
}

// --- SIGN OUT ---
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) return { success: false, error: error.message };
    return { success: true };
  } catch (err: any) {
    console.error('Sign out error:', err);
    return { success: false, error: err.message };
  }
}
