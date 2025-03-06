// This is a mock service for sending emails
// In a real application, you would integrate with an email service provider
// like SendGrid, Mailgun, AWS SES, etc.

import { renderToString } from 'react-dom/server';
import EmailOTPTemplate from '../templates/EmailOTP';

interface SendOTPEmailParams {
  email: string;
  otpCode: string;
  userName?: string;
}

export const sendOTPEmail = async ({ email, otpCode, userName }: SendOTPEmailParams): Promise<boolean> => {
  try {
    // In a real implementation, you would:
    // 1. Generate the email HTML using the template
    const emailHtml = renderToString(
      EmailOTPTemplate({ otpCode, userName, expiryMinutes: 10 })
    );
    
    // 2. Send the email using your email service provider
    console.log(`Sending OTP email to ${email} with code ${otpCode}`);
    console.log(`Email HTML: ${emailHtml.substring(0, 100)}...`);
    
    // Mock successful email sending
    return true;
  } catch (error) {
    console.error('Error sending OTP email:', error);
    return false;
  }
};

// Function to generate a random OTP code
export const generateOTP = (length: number = 6): string => {
  const digits = '0123456789';
  let otp = '';
  
  for (let i = 0; i < length; i++) {
    otp += digits[Math.floor(Math.random() * 10)];
  }
  
  return otp;
};