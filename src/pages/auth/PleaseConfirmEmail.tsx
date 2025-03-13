import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../../services/supabaseClient';

const EMAIL_KEY = 'emailConfirmationAddress';

const PleaseConfirmEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Get email from location state or localStorage
  const emailFromState = (location.state as { email?: string })?.email || '';
  const emailFromStorage = localStorage.getItem(EMAIL_KEY) || '';
  const email = emailFromState || emailFromStorage;
  
  useEffect(() => {
    if (!email) {
      navigate('/homeowner/signup');
      return;
    }
    
    // Store email for persistence
    if (emailFromState && !emailFromStorage) {
      localStorage.setItem(EMAIL_KEY, emailFromState);
    }
  }, [email, emailFromState, emailFromStorage, navigate]);
  
  // Polling: check every 3 seconds for email confirmation
  useEffect(() => {
    if (!email) return;

    const checkEmailConfirmation = async () => {
      try {
        // First check the auth session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError) {
          console.error('Error checking session:', sessionError);
          return;
        }

        // If we have a session and the email is confirmed
        if (session?.user?.email_confirmed_at) {
          // Update the profile confirmed status
          const { error: updateError } = await supabase
            .from('profiles')
            .update({ 
              confirmed: true,
              updated_at: new Date().toISOString()
            })
            .eq('id', session.user.id)
            .eq('confirmed', false); // Only update if not already confirmed

          if (updateError) {
            console.error('Error updating profile confirmation:', updateError);
            // Even if profile update fails, we know email is confirmed, so proceed
            console.log('Proceeding to dashboard despite profile update error');
          }

          // Clear storage and redirect to dashboard
          toast.success('Email confirmed! Redirecting to dashboard...');
          clearStorageAndRedirect('/homeowner/dashboard');
          return;
        }

        // If no session or email not confirmed, check the profile table
        // This handles cases where the user might have confirmed in another tab/device
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('id, confirmed, user_type')
          .eq('email', email.toLowerCase())
          .single();

        if (profileError && profileError.code !== 'PGRST116') {
          console.error('Error checking profile:', profileError);
          return;
        }

        // If profile is confirmed but we don't have a session, redirect to login
        if (profile?.confirmed) {
          toast.success('Email confirmed! Please log in to continue.');
          clearStorageAndRedirect('/homeowner/login');
          return;
        }
      } catch (error) {
        console.error('Error checking email confirmation:', error);
      }
    };
    
    const interval = setInterval(checkEmailConfirmation, 3000);
    checkEmailConfirmation(); // Check immediately on mount
    
    return () => clearInterval(interval);
  }, [email, navigate]);
  
  const clearStorageAndRedirect = (path: string) => {
    localStorage.removeItem(EMAIL_KEY);
    navigate(path);
  };
  
  const handleResendEmail = async () => {
    try {
      if (!email) return;
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/homeowner/email-confirmed`,
        },
      });

      if (error) {
        throw error;
      }
      
      toast.info('Confirmation email sent again. Please check your inbox.');
    } catch (error) {
      console.error('Error resending confirmation email:', error);
      toast.error('Failed to resend confirmation email. Please try again.');
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Almost there!</h2>
        <p className="text-gray-700 mb-6">
          We've sent a verification link to <strong>{email}</strong>.<br />
          Please check your email and click the confirmation link.
        </p>
        <p className="text-gray-600 mb-6">
          Once you confirm, you will be redirected to your dashboard.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={handleResendEmail}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Resend Email
          </button>
          <button
            onClick={() => clearStorageAndRedirect('/homeowner/signup')}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancel &amp; Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PleaseConfirmEmail;