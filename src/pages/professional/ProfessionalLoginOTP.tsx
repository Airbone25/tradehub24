import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';

const ProfessionalLoginOTP: React.FC = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const { loginWithOTP, isAuthenticated, userType } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Check if we're on the callback page
  const isCallback = location.pathname.includes('callback');

  useEffect(() => {
    // If user is already authenticated and is a professional, redirect to dashboard
    if (isAuthenticated && userType === 'professional') {
      navigate('/professional/dashboard');
    }
    // If user is authenticated but not a professional, redirect to appropriate dashboard
    else if (isAuthenticated && userType === 'homeowner') {
      navigate('/homeowner/dashboard');
    }
    
    // Handle OTP callback
    if (isCallback) {
      const handleOTPCallback = async () => {
        setLoading(true);
        try {
          // The OTP confirmation is handled automatically by Supabase Auth
          setMessage({ type: 'success', text: 'Successfully authenticated! Redirecting...' });
          // Redirect will happen in the useEffect above once auth state updates
        } catch (error: any) {
          console.error('Error during OTP callback:', error);
          setMessage({ type: 'error', text: error.message || 'Failed to verify login link' });
        } finally {
          setLoading(false);
        }
      };

      handleOTPCallback();
    }
  }, [isAuthenticated, userType, navigate, isCallback]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      await loginWithOTP(email, 'professional');
      setMessage({ 
        type: 'success', 
        text: 'Magic link sent! Check your email for a login link.' 
      });
    } catch (error: any) {
      console.error('Login error:', error);
      setMessage({ 
        type: 'error', 
        text: error.message || 'Failed to send magic link. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (isCallback) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Verifying your login
            </h2>
          </div>
          
          <div className="mt-8 space-y-6">
            {loading ? (
              <div className="flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : message ? (
              <div className={`rounded-md p-4 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                {message.text}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Professional Login with Magic Link
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Enter your email to receive a secure login link
          </p>
        </div>
        
        {message && (
          <div className={`rounded-md p-4 ${message.type === 'success' ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
            {message.text}
          </div>
        )}
        
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {loading ? 'Sending...' : 'Send Magic Link'}
            </button>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="/professional/login" className="font-medium text-blue-600 hover:text-blue-500">
                Login with password instead
              </a>
            </div>
            <div className="text-sm">
              <a href="/professional/signup" className="font-medium text-blue-600 hover:text-blue-500">
                Sign up
              </a>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfessionalLoginOTP;
