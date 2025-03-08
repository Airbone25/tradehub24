// src/services/emailService.ts
import { supabase } from './supabaseClient';

/**
 * Check if an email is registered in Supabase Auth and get user type
 */
export const checkIfEmailExists = async (
  email: string
): Promise<{ exists: boolean; userType?: 'homeowner' | 'professional' | 'admin' }> => {
  try {
    // Check profiles table
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('user_type, email')
      .eq('email', email)
      .single();

    if (profileError) {
      if (profileError.code === 'PGRST116') {
        // No match found
        return { exists: false };
      }
      throw profileError;
    }

    if (profile) {
      return {
        exists: true,
        userType: profile.user_type as 'homeowner' | 'professional' | 'admin'
      };
    }

    return { exists: false };
  } catch (error: any) {
    console.error('Error checking email existence:', error);
    throw new Error(error.message || 'Error checking email');
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
