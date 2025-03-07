// src/services/emailService.ts
import { supabase } from './supabaseClient';

// Check if an email is registered; returns userType if found
export const checkIfEmailExists = async (
  email: string
): Promise<{ exists: boolean; userType?: 'homeowner' | 'professional' }> => {
  try {
    const { data: userList, error: listError } = await supabase.auth.admin.listUsers({
      filters: { email },
    });
    if (listError) {
      console.error('Error checking user:', listError);
      return { exists: false };
    }
    if (userList?.users?.length > 0) {
      const userMetadata = userList.users[0].user_metadata;
      return {
        exists: true,
        userType: userMetadata?.user_type as 'homeowner' | 'professional',
      };
    }
    return { exists: false };
  } catch (error: any) {
    console.error('Error checking email existence:', error);
    throw new Error(error.message || 'Error checking email');
  }
};
