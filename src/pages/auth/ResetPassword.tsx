// src/pages/auth/ResetPassword.tsx
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { supabase } from '../../services/supabaseClient';
import { Mail } from 'lucide-react';
import { checkIfEmailExists } from '../../services/emailService';

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { userType } = useParams<{ userType: 'homeowner' | 'professional' }>();

  const handleResetRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email');
      return;
    }
    setLoading(true);
    try {
      // Check if email exists and get user type
      const { exists, userType: existingUserType } = await checkIfEmailExists(email);
      
      if (!exists) {
        // For security, show the same message even if email doesn't exist
        toast.success('If an account exists with this email, a password reset link has been sent.');
        return;
      }

      // If userType is specified and doesn't match, redirect
      if (userType && existingUserType && userType !== existingUserType) {
        toast.info(`Redirecting to ${existingUserType} password reset...`);
        navigate(`/${existingUserType}/reset-password`);
        return;
      }

      // Supabase: request a password reset link
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/${existingUserType || userType || 'auth'}/update-password`,
      });
      
      if (error) throw error;
      
      // For security, show the same success message
      toast.success('If an account exists with this email, a password reset link has been sent.');
    } catch (err: any) {
      // For security, show success even on error
      toast.success('If an account exists with this email, a password reset link has been sent.');
      console.error('Password reset error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center px-6 py-12">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">Reset Password</h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Enter your email to receive a password reset link.
          {userType && ` (${userType} account)`}
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          <form onSubmit={handleResetRequest} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md 
                    shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md 
                  shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 
                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 
                  disabled:opacity-50"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
