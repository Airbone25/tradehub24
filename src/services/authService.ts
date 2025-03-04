import { supabase } from './supabaseClient';

export type UserType = 'homeowner' | 'professional' | 'admin';

export interface UserProfile {
  id: string;
  user_type: UserType;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  postcode?: string;
  company_name?: string;
  business_registration_number?: string;
  trade?: string;
  created_at?: string;
  updated_at?: string;
}

// Email signup
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

    // Handle different parameter formats
    if (typeof userTypeOrOptions === 'string') {
      // Format: signUpWithEmail(email, password, 'homeowner')
      userType = userTypeOrOptions as UserType;
      options = {
        emailRedirectTo: `${window.location.origin}/${userType}/login`,
        data: { user_type: userType }
      };
    } else {
      // Format: signUpWithEmail(email, password, { data: {...} })
      options = userTypeOrOptions;
      userType = options.data?.user_type || 'homeowner';
    }

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: options.emailRedirectTo || `${window.location.origin}/${userType}/login`,
        data: { user_type: userType, ...options.data }
      }
    });

    if (error) {
      throw error;
    }

    if (data.user) {
      // Insert additional user data into profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: data.user.id,
          email,
          user_type: userType,
          ...(profileData || {}),
          ...(options.data || {}),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        });

      if (profileError) {
        console.error('Error creating user profile:', profileError);
        return { data, error: profileError.message };
      }
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('Sign up error:', error);
    return { data: null, error: error.message };
  }
}

// Login with email and password
export async function signInWithPassword(email: string, password: string) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return { data: null, error: error.message };
    }

    // Get user profile to verify user type
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', data.user.id)
      .single();

    if (profileError) {
      return { data: null, error: 'Error fetching user profile' };
    }

    return { data: { ...data, profile }, error: null };
  } catch (error: any) {
    console.error('Sign in error:', error);
    return { data: null, error: error.message };
  }
}

// Alias for signInWithPassword to maintain backward compatibility
export const signInWithEmail = signInWithPassword;

// Login with OTP (Magic Link)
export async function signInWithOtp(email: string, userType: UserType) {
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/${userType}/login-otp-callback`,
        data: { user_type: userType }
      }
    });

    if (error) {
      return { data: null, error: error.message };
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('OTP sign in error:', error);
    return { data: null, error: error.message };
  }
}

// Verify OTP callback and set session
export async function verifyOtpCallback() {
  try {
    // In Supabase v2, the session is automatically handled when the user is redirected back
    // We just need to get the current session
    const { data, error } = await supabase.auth.getSession();
    
    if (error) {
      return { data: null, error: error.message };
    }

    if (data.session) {
      return { data: data.session, error: null };
    }
    
    return { data: null, error: 'No session found' };
  } catch (error: any) {
    console.error('OTP verification error:', error);
    return { data: null, error: error.message };
  }
}

// Get current user with profile
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    
    if (error) {
      return { data: null, error: error.message };
    }

    if (!user) {
      return { data: null, error: 'No user found' };
    }

    // Get user profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    
    if (profileError) {
      return { data: null, error: profileError.message };
    }
    
    return { data: { user, profile }, error: null };
  } catch (error: any) {
    console.error('Get user error:', error);
    return { data: null, error: error.message };
  }
}

// Update user profile
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
        updated_at: new Date().toISOString()
      })
      .eq('id', user.id)
      .select();
    
    if (error) {
      return { data: null, error: error.message };
    }
    
    return { data: data[0], error: null };
  } catch (error: any) {
    console.error('Update profile error:', error);
    return { data: null, error: error.message };
  }
}

// Logout
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      return { success: false, error: error.message };
    }
    
    return { success: true };
  } catch (error: any) {
    console.error('Sign out error:', error);
    return { success: false, error: error.message };
  }
}