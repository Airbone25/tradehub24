// src/services/authService.ts
import { supabase } from './supabaseClient';
import { checkIfEmailExists } from './emailService';

export type UserType = 'homeowner' | 'professional' | 'admin';

interface SignUpOptions {
  emailRedirectTo?: string;
  data?: Record<string, any>;
}

export const signUpWithEmail = async (
  email: string,
  password: string,
  userTypeOrOptions: UserType | SignUpOptions
) => {
  try {
    let userType: UserType;
    let options: SignUpOptions = {};

    if (typeof userTypeOrOptions === 'string') {
      userType = userTypeOrOptions;
      options = {};
    } else {
      options = userTypeOrOptions;
      userType = options.data?.user_type || 'homeowner';
    }

    // Check if email already exists
    const { exists, userType: existingUserType } = await checkIfEmailExists(email);
    if (exists) {
      if (existingUserType) {
        return { 
          data: null, 
          error: `This email is already used by a ${existingUserType} account. Please use a different email.` 
        };
      }
      return { data: null, error: 'Email already registered. Please log in.' };
    }

    // Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: options.emailRedirectTo || `${window.location.origin}/${userType}/login`,
        data: {
          user_type: userType,
          ...options.data,
        },
      },
    });

    if (error) throw error;

    // Create profile record
    if (data.user) {
      const normalizedEmail = email.toLowerCase();
      
      // First try to get existing profile
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.user.id)
        .single();

      if (!existingProfile) {
        // Create new profile if it doesn't exist
        const { error: profileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          email: normalizedEmail,
          user_type: userType,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_active: true,
        });

        if (profileError) {
          console.error('Error creating profile:', profileError);
          // Attempt to delete the auth user if profile creation fails
          await supabase.auth.signOut();
          throw new Error('Failed to create user profile. Please try again.');
        }
      }

      // Create professional record if needed
      if (userType === 'professional') {
        const { error: professionalError } = await supabase.from('professionals').insert({
          user_id: data.user.id,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          is_active: true,
        });

        if (professionalError) {
          console.error('Error creating professional record:', professionalError);
          // Don't throw here as the user and profile are already created
        }
      }
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('Error in signUpWithEmail:', error);
    return { data: null, error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    // Always convert email to lowercase for consistency
    const normalizedEmail = email.toLowerCase();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error) {
      // Check if it's an invalid login error
      if (error.message.includes('Invalid login credentials')) {
        // Try to check if email exists to give better error message
        const { exists, userType } = await checkIfEmailExists(normalizedEmail);
        if (!exists) {
          throw new Error('No account found with this email. Please sign up.');
        }
        throw new Error('Invalid password. Please try again.');
      }
      throw error;
    }

    // Verify the user exists in profiles table
    if (data.user) {
      // First try to get existing profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      if (!profile) {
        // Profile doesn't exist, create it from user metadata
        const userType = data.user.user_metadata?.user_type || 'homeowner';
        const { error: createProfileError } = await supabase.from('profiles').insert({
          id: data.user.id,
          email: normalizedEmail,
          user_type: userType,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

        if (createProfileError) {
          console.error('Error creating missing profile:', createProfileError);
          throw new Error('Failed to access user profile. Please try again.');
        }
      }

      // Log the login activity
      const { error: activityError } = await supabase.from('login_activity').insert({
        user_id: data.user.id,
        login_time: new Date().toISOString(),
        ip_address: 'client-side',
        user_agent: navigator.userAgent,
      });

      if (activityError) {
        console.error('Error logging activity:', activityError);
      }
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('Error in signInWithEmail:', error);
    return { data: null, error: error.message };
  }
};

export const signOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error in signOut:', error);
    return { success: false, error: error.message };
  }
};

export const signOutAllSessions = async () => {
  try {
    const { error } = await supabase.auth.signOut({ scope: 'global' });
    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error in signOutAllSessions:', error);
    return { success: false, error: error.message };
  }
};

export const resetPassword = async (email: string) => {
  try {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) throw error;
    return { success: true, error: null };
  } catch (error: any) {
    console.error('Error in resetPassword:', error);
    return { success: false, error: error.message };
  }
};
