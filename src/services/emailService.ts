import { supabase } from './supabaseClient';

export const checkIfEmailExists = async (
  email: string
): Promise<{ exists: boolean; userType?: 'homeowner' | 'professional' | 'admin' }> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('user_type, email')
      .eq('email', email.toLowerCase())
      .maybeSingle();

    if (error) {
      console.error('Error checking email existence:', error);
      return { exists: false };
    }

    if (data) {
      return { exists: true, userType: data.user_type as 'homeowner' | 'professional' | 'admin' };
    } else {
      return { exists: false };
    }
  } catch (error: any) {
    console.error('Error in checkIfEmailExists:', error);
    return { exists: false };
  }
};

export const isEmailVerified = async (userId: string): Promise<boolean> => {
  try {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) throw error;
    if (user?.id !== userId) return false;
    return user?.email_confirmed_at != null;
  } catch (error) {
    console.error('Error checking email verification:', error);
    return false;
  }
};

export const sendConfirmationEmail = async (email: string, userType: 'homeowner' | 'professional' | 'admin') => {
  // Placeholder: Replace with your branded email template logic.
  console.log(`Sending branded confirmation email to ${email} for ${userType} account.`);
  return true;
};

export const sendWelcomeEmail = async (email: string, userType: 'homeowner' | 'professional' | 'admin') => {
  // Placeholder: Replace with your branded welcome email template logic.
  console.log(`Sending branded welcome email to ${email} for ${userType} account.`);
  return true;
};
