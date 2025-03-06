import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const VerificationSuccess: React.FC = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    // Automatically redirect after 3 seconds
    const timer = setTimeout(() => {
      navigate('/homeowner');
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [navigate]);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verification Successful!
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Your identity has been verified. You will be redirected shortly.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
          <p className="text-gray-700 mb-6">
            Thank you for verifying your account. You now have full access to TradeHub24.
          </p>
          
          <button
            onClick={() => navigate('/homeowner')}
            className="inline-flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificationSuccess;