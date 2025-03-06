import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { verifyOTP, signInWithOTP } from '../../lib/supabase';
import toast from 'react-hot-toast';

const OTPVerification: React.FC = () => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email;

  const inputRefs = Array(6).fill(0).map(() => React.createRef<HTMLInputElement>());

  useEffect(() => {
    if (!email) {
      navigate('/login');
      return;
    }

    let timer: NodeJS.Timeout;
    if (timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLeft, email, navigate]);

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }

    if (value && !/^\d+$/.test(value)) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    if (!/^\d+$/.test(pastedData)) {
      return;
    }

    const digits = pastedData.slice(0, 6).split('');
    const newOtp = [...otp];
    
    digits.forEach((digit, index) => {
      if (index < 6) {
        newOtp[index] = digit;
      }
    });

    setOtp(newOtp);

    if (digits.length < 6 && inputRefs[digits.length].current) {
      inputRefs[digits.length].current?.focus();
    }
  };

  const handleVerify = async () => {
    const otpString = otp.join('');
    if (otpString.length !== 6) {
      toast.error('Please enter the complete 6-digit code');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await verifyOTP(email, otpString);
      if (error) throw error;

      if (data) {
        toast.success('Verification successful!');
        navigate('/verification-success');
      }
    } catch (error: any) {
      toast.error(error.message || 'Invalid verification code');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (!canResend) return;

    setIsLoading(true);
    try {
      const { error } = await signInWithOTP(email);
      if (error) throw error;

      toast.success('New OTP sent to your email!');
      setTimeLeft(60);
      setCanResend(false);
    } catch (error: any) {
      toast.error(error.message || 'Failed to send OTP');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          className="mx-auto h-12 w-auto"
          src="https://via.placeholder.com/150x50?text=TradeHub24"
          alt="TradeHub24"
        />
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Verify your email
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We've sent a verification code to<br />
          <span className="font-medium text-gray-900">{email}</span>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Enter verification code
              </label>
              <div className="mt-1 flex justify-center space-x-2">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={inputRefs[index]}
                    type="text"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={index === 0 ? handlePaste : undefined}
                    className="w-12 h-12 text-center text-xl font-semibold border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                ))}
              </div>
            </div>

            <div>
              <button
                onClick={handleVerify}
                disabled={isLoading}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                {isLoading ? (
                  <Loader className="animate-spin h-5 w-5" />
                ) : (
                  'Verify'
                )}
              </button>
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600">
                Didn't receive the code?{' '}
                {timeLeft > 0 ? (
                  <span className="font-medium">
                    Resend in {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </span>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    disabled={!canResend || isLoading}
                    className="font-medium text-blue-600 hover:text-blue-500"
                  >
                    Resend code
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;