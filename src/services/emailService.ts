// src/services/emailService.ts
import { supabase } from './supabaseClient';

/**
 * Check if an email is registered in Supabase Auth and get user type
 */
export const checkIfEmailExists = async (
  email: string
): Promise<{ exists: boolean; userType?: 'homeowner' | 'professional' | 'admin' }> => {
  try {
    // First check auth system
    const { data: signInData, error: signInError } = await supabase.auth.signInWithOtp({
      email,
      options: { shouldCreateUser: false }
    });

    // If we get an error about user not found, the email doesn't exist
    if (signInError?.message?.includes('Email not found')) {
      return { exists: false };
    }

    // Check profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_type, email')
      .eq('email', email.toLowerCase())
      .single();

    if (profileError) {
      if (profileError.code === 'PGRST116') {
        // Profile doesn't exist but user might exist in auth
        return { exists: true };
      }
      throw profileError;
    }

    if (profile) {
      return {
        exists: true,
        userType: profile.user_type as 'homeowner' | 'professional' | 'admin'
      };
    }

    // If we get here, the user exists in auth but not in profiles
    return { exists: true };
  } catch (error: any) {
    console.error('Error checking email existence:', error);
    // If it's not a "user not found" error, assume the email exists
    // to prevent information disclosure
    return { exists: true };
  }
};

/**
 * Verify if a user's email is confirmed
 */
export const isEmailVerified = async (userId: string): Promise<boolean> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    
    // Only check verification for the current user
    if (user?.id !== userId) return false;
    
    return user?.email_confirmed_at != null;
  } catch (error) {
    console.error('Error checking email verification:', error);
    return false;
  }
};
