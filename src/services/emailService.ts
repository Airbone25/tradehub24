import { supabase } from './supabaseClient';

/**
 * Check if an email is registered in Supabase Auth and get user type
 */
/**
 * Check if an email is registered in the profiles table and get user type.
 */
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
      // Assume email doesn't exist to avoid false positives
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

/**
 * Send a branded confirmation email to the homeowner.
 * This email should include your Trade Hub24 colors and theme.
 */
export const sendConfirmationEmail = async (email: string, userType: 'homeowner' | 'professional' | 'admin') => {
  // In a real application, integrate your email service here.
  // For now, we simply log to the console.
  console.log(`Sending branded confirmation email to ${email} for ${userType} account.`);
  // Example integration:
  // await emailService.send({ to: email, subject: 'Confirm Your Account', html: '<div style="color:#105298;"> ... </div>' });
  return true;
};

/**
 * Send a branded welcome email with instructions on how to post a job.
 */
export const sendWelcomeEmail = async (email: string, userType: 'homeowner' | 'professional' | 'admin') => {
  // In a real application, integrate your email service here.
  console.log(`Sending branded welcome email to ${email} for ${userType} account.`);
  // Example integration:
  // await emailService.send({ to: email, subject: 'Welcome to Trade Hub24', html: '<div style="color:#105298;">Learn how to post a job ...</div>' });
  return true;
};
