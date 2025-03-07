// src/pages/professional/ProfessionalEmailConfirmedCallback.tsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';

const ProfessionalEmailConfirmedCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    async function handleConfirmation() {
      try {
        // Parse tokens from URL hash
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          // Set session so Supabase recognizes the user
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;

          // Double-check the user type
          const { data: { user } } = await supabase.auth.getUser();
          if (user?.user_metadata?.user_type === 'professional') {
            // Go to professional dashboard
            navigate('/professional/dashboard');
          } else {
            // If user_type not professional, fallback
            navigate('/');
          }
        } else {
          // No tokens found => fallback
          navigate('/professional/login');
        }
      } catch (err: any) {
        console.error('Error in professional email-confirmed-callback:', err);
        navigate('/professional/login');
      }
    }

    handleConfirmation();
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Confirming your account...</h2>
        <p className="text-gray-700">Please wait while we verify your email.</p>
      </div>
    </div>
  );
};

export default ProfessionalEmailConfirmedCallback;
