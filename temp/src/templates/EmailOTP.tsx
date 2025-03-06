import React from 'react';

interface EmailOTPTemplateProps {
  otpCode: string;
  userName?: string;
  expiryMinutes?: number;
}

const EmailOTPTemplate: React.FC<EmailOTPTemplateProps> = ({ 
  otpCode, 
  userName = 'Valued Customer', 
  expiryMinutes = 10 
}) => {
  // This component represents what the email will look like
  // In a real implementation, you would use a library like mjml or react-email
  // to generate the actual HTML email that gets sent
  
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', maxWidth: '600px', margin: '0 auto' }}>
      <div style={{ backgroundColor: '#0e4c92', padding: '20px', textAlign: 'center' }}>
        <img 
          src="https://via.placeholder.com/150x50?text=TradeHub24" 
          alt="TradeHub24" 
          style={{ height: '40px' }} 
        />
      </div>
      
      <div style={{ backgroundColor: '#ffffff', padding: '30px', borderBottom: '1px solid #e5e7eb' }}>
        <h1 style={{ color: '#0e4c92', fontSize: '24px', marginBottom: '20px' }}>Verification Code</h1>
        
        <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
          Hello {userName},
        </p>
        
        <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
          Please use the following verification code to complete your action on TradeHub24:
        </p>
        
        <div style={{ 
          backgroundColor: '#f3f4f6', 
          padding: '16px', 
          textAlign: 'center', 
          borderRadius: '8px',
          marginBottom: '24px',
          letterSpacing: '8px',
          fontSize: '32px',
          fontWeight: 'bold',
          color: '#0e4c92'
        }}>
          {otpCode}
        </div>
        
        <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
          This code will expire in {expiryMinutes} minutes.
        </p>
        
        <p style={{ color: '#4b5563', fontSize: '16px', lineHeight: '24px', marginBottom: '24px' }}>
          If you didn't request this code, please ignore this email or contact our support team if you have concerns.
        </p>
        
        <div style={{ 
          backgroundColor: '#e10600', 
          color: 'white',
          padding: '12px 24px',
          borderRadius: '4px',
          display: 'inline-block',
          fontWeight: 'bold',
          textDecoration: 'none',
          textAlign: 'center',
          marginBottom: '24px'
        }}>
          Return to TradeHub24
        </div>
      </div>
      
      <div style={{ backgroundColor: '#f3f4f6', padding: '20px', textAlign: 'center' }}>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '16px' }}>
          Need help? Contact our support team at <a href="mailto:support@tradehub24.com" style={{ color: '#0e4c92' }}>support@tradehub24.com</a>
        </p>
        
        <div style={{ marginBottom: '16px' }}>
          <a href="#" style={{ color: '#0e4c92', marginRight: '16px', textDecoration: 'none', fontSize: '14px' }}>Privacy Policy</a>
          <a href="#" style={{ color: '#0e4c92', marginRight: '16px', textDecoration: 'none', fontSize: '14px' }}>Terms of Service</a>
          <a href="#" style={{ color: '#0e4c92', textDecoration: 'none', fontSize: '14px' }}>Contact Us</a>
        </div>
        
        <p style={{ color: '#6b7280', fontSize: '14px' }}>
          &copy; 2025 TradeHub24. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default EmailOTPTemplate;