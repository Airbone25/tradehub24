import { supabase } from './supabaseClient';

export const checkIfEmailExists = async (email: string): Promise<{ exists: boolean; userType?: 'homeowner' | 'professional' }> => {
  try {
    // Check in auth.users table
    const { data: user, error: userError } = await supabase.auth.admin.listUsers({
      filters: {
        email: email
      }
    });

    if (userError) {
      console.error('Error checking user:', userError);
      return { exists: false };
    }

    if (user?.users?.length > 0) {
      const userMetadata = user.users[0].user_metadata;
      return { 
        exists: true, 
        userType: userMetadata?.user_type as 'homeowner' | 'professional' 
      };
    }

    return { exists: false };
  } catch (error: any) {
    console.error('Error checking email existence:', error);
    throw new Error(error.message || 'Error checking email');
  }
};
