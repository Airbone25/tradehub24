// src/services/profileService.ts

import { supabase } from './supabaseClient';
import { UserProfile, UserType } from './authService';

export async function createProfile(profileData: Partial<UserProfile>) {
  // Make sure there's a valid session
  const { data: sessionData } = await supabase.auth.getSession();
  const user = sessionData?.session?.user;
  if (!user) {
    throw new Error('No authenticated user. Please log in first.');
  }

  // Insert a new row into "profiles" with the same ID as the user
  const { error } = await supabase
    .from('profiles')
    .insert({
      id: user.id,
      user_type: profileData.user_type,
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      phone: profileData.phone,
      postcode: profileData.postcode,
      company_name: profileData.company_name,
      business_registration_number: profileData.business_registration_number,
      trade: profileData.trade,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });

  if (error) {
    throw new Error(error.message);
  }

  return true;
}
