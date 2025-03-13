// src/pages/homeowner/HomeownerEmailConfirmedCallback.tsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';

const HomeownerEmailConfirmedCallback: React.FC = () => {
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
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) throw error;

          // After successful session setup, redirect to the login page
          navigate('/homeowner/login');
        } else {
          // No tokens found, fallback to login
          navigate('/homeowner/login');
        }
      } catch (err: any) {
        console.error('Error in email confirmation callback:', err);
        navigate('/homeowner/login');
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

export default HomeownerEmailConfirmedCallback;
