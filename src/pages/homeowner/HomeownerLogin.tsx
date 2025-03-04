// src/pages/homeowner/HomeownerLogin.tsx

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { checkIfEmailExists } from '../../services/emailService';
import { toast } from 'react-toastify';

import { Mail, Lock } from 'lucide-react';

const HomeownerLogin = () => {
  const navigate = useNavigate();

  // Form fields
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Loading & error states
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // --- 1. Parse #access_token / #refresh_token (from second snippet) ---
  useEffect(() => {
    async function parseHashTokens() {
      if (window.location.hash) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');
        if (accessToken && refreshToken) {
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          if (error) {
            console.error('Error setting session from hash (HomeownerLogin):', error.message);
          } else {
            console.log('Session stored from hash (HomeownerLogin):', data);
          }
          // remove hash from URL
          window.history.replaceState({}, document.title, window.location.pathname);
        }
      }
    }
    parseHashTokens();
  }, []);

  // --- 2. Pre-check logic (from first snippet) ---
  const handlePreCheck = async (checkEmail: string) => {
    try {
      const { exists, userType } = await checkIfEmailExists(checkEmail);
      if (!exists) {
        toast.error('No account found with this email. Please sign up.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/homeowner/signup', {
          state: { message: 'Account not found. Please sign up.', email: checkEmail },
        });
        return false;
      }
      if (userType && userType !== 'homeowner') {
        toast.error('This email is registered as a professional. Please use the professional login.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        setErrorMessage(
          'This email is registered as a professional. Please use the professional login.'
        );
        return false;
      }
      return true;
    } catch (err: any) {
      const errorMsg = err.message || 'Error checking email';
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setErrorMessage(errorMsg);
      return false;
    }
  };

  // --- 3. Handle login with password (combine second snippet's design with first snippet's logic) ---
  const handleLoginWithPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      // 1. Pre-check
      const canProceed = await handlePreCheck(email);
      if (!canProceed) {
        setLoading(false);
        return;
      }

      // 2. Actually sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      // 3. On success
      if (data?.user) {
        toast.success('Login successful!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        navigate('/homeowner/dashboard'); // or wherever you want after login
      }
    } catch (err: any) {
      const errorMsg = err.message || 'An error occurred during login';
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setErrorMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // --- 4. Handle login with OTP (Magic Link) ---
  const handleLoginWithOTP = async () => {
    setErrorMessage('');
    if (!email) {
      toast.error('Please enter your email', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      return;
    }

    try {
      const canProceed = await handlePreCheck(email);
      if (!canProceed) return;

      // Instead of directly sending OTP, we’ll navigate to a separate page
      // so user can enter email for magic link. 
      // OR if you want to do it in one step:
      // const { data, error } = await supabase.auth.signInWithOtp(...)

      navigate('/homeowner/login-otp', { state: { email } });
    } catch (error: any) {
      const errorMsg = error.message || 'An error occurred';
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setErrorMessage(errorMsg);
    }
  };

  // --- 5. Handle login with Google OAuth ---
  const handleLoginWithGoogle = async () => {
    setErrorMessage('');
    try {
      // optional: you can do a preCheck if you want to confirm user is homeowner
      // but with OAuth, it's tricky to pre-check the email. 
      // So you might do the check after the user logs in.

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/homeowner/dashboard`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      if (error) throw error;
      // The user is redirected to Google; upon success, they'll come back 
      // with #access_token => parseHashTokens => set session
    } catch (err: any) {
      const errorMsg = err.message || 'An error occurred during Google login';
      toast.error(errorMsg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      setErrorMessage(errorMsg);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Welcome back, Homeowner
        </h2>
      </div>

      {/* Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">

          {/* Show error message if any */}
          {errorMessage && (
            <div className="mb-4 text-sm text-red-600 bg-red-50 p-3 rounded">
              {errorMessage}
            </div>
          )}

          {/* Main form */}
          <form className="space-y-6" onSubmit={handleLoginWithPassword}>
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

            {/* Remember me + forgot password */}
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

            {/* Submit */}
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm
                           text-sm font-medium text-white bg-[#e20000] hover:bg-[#cc0000]
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#105298]
                           disabled:opacity-50"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </div>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
          </div>

          {/* Additional Buttons */}
          <div className="mt-6 space-y-2">
            {/* Magic Link (Email OTP) */}
            <button
              type="button"
              onClick={handleLoginWithOTP}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm
                         text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Login with Email OTP
            </button>

            {/* Google OAuth */}
            <button
              type="button"
              onClick={handleLoginWithGoogle}
              className="w-full flex items-center justify-center border border-gray-300 rounded-md shadow-sm
                         px-6 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50
                         focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <img
                src="/src/assets/googlepng.png"
                alt="Google Logo"
                className="h-5 w-5 mr-2"
              />
              <span>Continue with Google</span>
            </button>
          </div>

          {/* Sign up link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/homeowner/signup" className="font-medium text-[#105298] hover:text-blue-700">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeownerLogin;
