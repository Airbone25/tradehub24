import { supabase } from './supabaseClient';
import { checkIfEmailExists, sendConfirmationEmail, sendWelcomeEmail } from './emailService';

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

    // Create user in Supabase Auth with a redirect URL set to our dedicated callback route.
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: options.emailRedirectTo || `${window.location.origin}/auth/email-confirmed`,
        data: {
          user_type: userType,
          ...options.data,
        },
      },
    });

    if (error) throw error;

    // Send branded emails for homeowners and professionals.
    if (userType === 'homeowner' || userType === 'professional') {
      const normalizedEmail = email.toLowerCase();
      await sendConfirmationEmail(normalizedEmail, userType);
      await sendWelcomeEmail(normalizedEmail, userType);
    }

    return { data, error: null };
  } catch (error: any) {
    console.error('Error in signUpWithEmail:', error);
    return { data: null, error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const normalizedEmail = email.toLowerCase();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: normalizedEmail,
      password,
    });

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        const { exists } = await checkIfEmailExists(normalizedEmail);
        if (!exists) {
          throw new Error('No account found with this email. Please sign up.');
        }
        throw new Error('Invalid password. Please try again.');
      }
      throw error;
    }

    if (data.user) {
      // Retrieve user role from profile
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('user_type')
        .eq('id', data.user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        throw profileError;
      }

      // If no profile exists, create one with default values.
      if (!profile) {
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

      // Record login activity (optional – ensure the login_activity table exists with proper RLS)
      const { error: activityError } = await supabase.from('login_activity').insert({
        user_id: data.user.id,
        login_time: new Date().toISOString(),
        ip_address: 'client-side',
        user_agent: navigator.userAgent,
      });
      if (activityError) {
        console.error('Error logging activity:', activityError);
      }

      // Smart login: remember the last used role in localStorage.
      const userRole = profile ? profile.user_type : data.user.user_metadata?.user_type;
      if (userRole) {
        localStorage.setItem('lastUserType', userRole);
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
