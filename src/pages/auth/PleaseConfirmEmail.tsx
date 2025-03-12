import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const PleaseConfirmEmail: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds

  const email = (location.state as { email?: string })?.email || '';

  useEffect(() => {
    if (!email) {
      // If no email in state, redirect back to sign-up
      navigate('/homeowner/signup');
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          toast.error('Time is up! Please sign up again.');
          navigate('/homeowner/signup');
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [email, navigate]);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-4">Almost there!</h2>
        <p className="text-gray-700 mb-6">
          We’ve sent a verification link to <strong>{email}</strong>.<br />
          Please confirm your email within <strong>5 minutes</strong>.
        </p>
        <div className="text-xl font-semibold text-red-600 mb-6">
          Time left: {formatTime(timeLeft)}
        </div>
        <p className="text-gray-600 mb-6">
          Once you confirm, you can log in using your email and password.
        </p>
        <button
          onClick={() => navigate('/homeowner/signup')}
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Cancel &amp; Go Back
        </button>
      </div>
    </div>
  );
};

export default PleaseConfirmEmail;
