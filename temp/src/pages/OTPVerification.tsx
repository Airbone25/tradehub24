import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { generateOTP, sendOTPEmail } from '../services/emailService';
import { useUser } from '../contexts/UserContext';

const OTPVerification: React.FC = () => {
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [inputOTP, setInputOTP] = useState(['', '', '', '', '', '']);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { user } = useUser();
  
  const inputRefs = Array(6).fill(0).map(() => React.createRef<HTMLInputElement>());
  
  useEffect(() => {
    // Pre-fill email if user is logged in
    if (user?.email) {
      setEmail(user.email);
    }
  }, [user]);
  
  useEffect(() => {
    // Countdown timer
    if (isEmailSent && timeLeft > 0) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isEmailSent, timeLeft]);
  
  const handleSendOTP = async () => {
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setError('');
    const generatedOTP = generateOTP();
    setOtpCode(generatedOTP);
    
    const success = await sendOTPEmail({
      email,
      otpCode: generatedOTP,
      userName: user?.name
    });
    
    if (success) {
      setIsEmailSent(true);
      setTimeLeft(600); // Reset timer
      // Focus the first input field
      if (inputRefs[0].current) {
        inputRefs[0].current.focus();
      }
    } else {
      setError('Failed to send verification code. Please try again.');
    }
  };
  
  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) {
      value = value.charAt(0);
    }
    
    if (value && !/^\d+$/.test(value)) {
      return; // Only allow digits
    }
    
    const newInputOTP = [...inputOTP];
    newInputOTP[index] = value;
    setInputOTP(newInputOTP);
    
    // Auto-focus next input
    if (value && index < 5 && inputRefs[index + 1].current) {
      inputRefs[index + 1].current?.focus();
    }
  };
  
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === 'Backspace' && !inputOTP[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };
  
  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    
    if (!/^\d+$/.test(pastedData)) {
      return; // Only allow digits
    }
    
    const digits = pastedData.slice(0, 6).split('');
    const newInputOTP = [...inputOTP];
    
    digits.forEach((digit, index) => {
      if (index < 6) {
        newInputOTP[index] = digit;
      }
    });
    
    setInputOTP(newInputOTP);
    
    // Focus the appropriate input
    if (digits.length < 6 && inputRefs[digits.length].current) {
      inputRefs[digits.length].current?.focus();
    }
  };
  
  const handleVerifyOTP = () => {
    const enteredOTP = inputOTP.join('');
    
    if (enteredOTP.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    
    if (enteredOTP === otpCode) {
      // OTP verification successful
      navigate('/verification-success');
    } else {
      setError('Invalid verification code. Please try again.');
    }
  };
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
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
          Verification Required
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          We need to verify your identity to proceed
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {!isEmailSent ? (
            <div>
              <div className="mb-6">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  onClick={handleSendOTP}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Send Verification Code
                </button>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4">
                  We've sent a verification code to <span className="font-medium">{email}</span>. 
                  Please enter the code below.
                </p>
                
                <div className="flex justify-center space-x-2 mb-4">
                  {inputOTP.map((digit, index) => (
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
                
                <div className="flex justify-between items-center">
                  <p className="text-sm text-gray-500">
                    Time remaining: <span className="font-medium">{formatTime(timeLeft)}</span>
                  </p>
                  
                  <button
                    onClick={handleSendOTP}
                    disabled={timeLeft > 540} // Disable for 1 minute after sending
                    className={`text-sm font-medium ${
                      timeLeft > 540 
                        ? 'text-gray-400 cursor-not-allowed' 
                        : 'text-blue-600 hover:text-blue-500'
                    }`}
                  >
                    Resend Code
                  </button>
                </div>
              </div>

              <div>
                <button
                  onClick={handleVerifyOTP}
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Verify
                </button>
              </div>
            </div>
          )}
          
          {error && (
            <div className="mt-4 text-sm text-red-600">
              {error}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;