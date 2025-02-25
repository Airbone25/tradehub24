// src/pages/homeowner/HomeownerSignup.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Lock, User, MapPin, Phone } from 'lucide-react';

const HomeownerSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    postcode: '',
    phone: '',
  });

  // Handle changes for each input
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Sign up with Email OTP (Magic Link)
  const handleSignUpWithOTP = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOtp({
        email: formData.email,
        options: {
          emailRedirectTo: 'https://tradehub24.vercel.app/homeowner/login',
          data: {
            user_type: 'homeowner',
            phone: formData.phone,
            postcode: formData.postcode,
            firstName: formData.firstName,
            lastName: formData.lastName,
          },
        },
      });
      if (error) {
        console.error('Email OTP error:', error.message);
      } else {
        alert('Check your email for the magic link!');
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Google sign-up
  const handleSignUpWithGoogle = async () => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: 'https://tradehub24.vercel.app/homeowner/login',
        },
      });
      if (error) console.error('Google OAuth error:', error.message);
    } catch (err) {
      console.error(err);
    }
  };

  // Standard email+password sign-up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    // Supabase sign up
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: 'https://tradehub24.vercel.app/homeowner/login',
        data: {
          user_type: 'homeowner',
          phone: formData.phone,
          postcode: formData.postcode,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      },
    });

    if (error) {
      console.error('Sign up error:', error.message);
      alert(error.message);
    } else {
      // On success
      console.log('Signed up user:', data);
      // Optionally navigate or show a success message
      alert('Account created successfully! Please check your email to verify.');
      // navigate('/homeowner/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Create your homeowner account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/homeowner/login" className="font-medium text-[#105298] hover:text-blue-700">
            Sign in
          </Link>
        </p>
      </div>

      {/* Form Container */}
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* First & Last Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                               focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <div className="mt-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                               focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                  />
                </div>
              </div>
            </div>

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
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                             focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
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
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                             focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Confirm Password
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                             focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Postcode */}
            <div>
              <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
                Postcode
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="postcode"
                  name="postcode"
                  type="text"
                  required
                  value={formData.postcode}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                             focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 
                             focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm 
                           font-medium text-white bg-[#e20000] hover:bg-[#cc0000] focus:outline-none focus:ring-2 
                           focus:ring-offset-2 focus:ring-[#105298]"
              >
                Create Account
              </button>
            </div>
          </form>

          {/* Optional: Additional Buttons (Email OTP, Google) */}
          <div className="mt-6 space-y-2">
            <button
              type="button"
              onClick={handleSignUpWithOTP}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm 
                         font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Sign Up with Email OTP
            </button>
            <button
              type="button"
              onClick={handleSignUpWithGoogle}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm 
                         font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeownerSignup;
