// src/pages/professional/ProfessionalLogin.tsx
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Lock } from 'lucide-react';

const ProfessionalLogin = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // -- 1) PARSE HASH FOR ACCESS/REFRESH
  useEffect(() => {
    async function parseHash() {
      try {
        const url = new URL(window.location.href);
        const hashParams = new URLSearchParams(url.hash.slice(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) {
            console.error('Error setting session (ProfessionalLogin):', error.message);
          } else {
            console.log('Session stored from URL (ProfessionalLogin):', data?.session);
            // Remove hash from URL
            url.hash = '';
            window.history.replaceState({}, document.title, url.toString());
            // Optionally navigate('/professional/dashboard');
          }
        }
      } catch (err) {
        console.error('Exception parsing session from URL (ProfessionalLogin):', err);
      }
    }
    parseHash();
  }, []);

  // Email+Password
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      // Post-check user_type
      const sessionRes = await supabase.auth.getSession();
      const user = sessionRes.data?.session?.user;
      if (user?.user_metadata?.user_type !== 'professional') {
        await supabase.auth.signOut();
        alert('Access denied: you are not a professional user.');
      } else {
        // navigate to professional route
        navigate('/professional/dashboard');
      }
    }
  };

  // Email OTP
  const handleLoginWithOTP = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: 'https://tradehub24.vercel.app/professional/login',
      },
    });
    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the magic link!');
    }
  };

  // Google login
  const handleLoginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://tradehub24.vercel.app/professional/login',
      },
    });
    if (error) {
      alert(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Sign in to your professional account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Don't have an account?{' '}
          <Link to="/professional/signup" className="font-medium text-[#105298] hover:text-blue-700">
            Sign up
          </Link>
        </p>
      </div>

      {/* Form */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-[#105298] focus:ring-[#105298] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <Link to="/forgot-password" className="font-medium text-[#105298] hover:text-blue-700">
                  Forgot your password?
                </Link>
              </div>
            </div>

            {/* Sign In Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                           text-sm font-medium text-white bg-[#e20000] hover:bg-[#cc0000] 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#105298]"
              >
                Sign in
              </button>
            </div>
          </form>

          {/* Additional Buttons (Email OTP, Google) */}
          <div className="mt-6 space-y-2">
            {/* Email OTP button */}
            <button
              type="button"
              onClick={handleLoginWithOTP}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm 
                         text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Login with Email OTP
            </button>

            {/* Google button */}
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="
                w-full
                flex
                items-center
                justify-center
                border
                border-gray-300
                rounded-md
                shadow-sm
                px-6
                py-2
                text-sm
                font-medium
                text-gray-700
                bg-white
                hover:bg-gray-50
                focus:outline-none
                focus:ring-2
                focus:ring-offset-2
                focus:ring-gray-500
              "
            >
              <svg
                className="h-5 w-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="-0.5 0 48 48"
                version="1.1"
              >
                {/* (SVG path content) */}
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalLogin;
