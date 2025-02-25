// src/pages/professional/ProfessionalSignup.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/supabaseClient';
import { Mail, Lock, User, MapPin, Phone, Briefcase } from 'lucide-react';

const ProfessionalSignup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    trade: '',
    postcode: '',
    phone: '',
    businessRegistration: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Email OTP sign-up
  const handleSignUpWithOTP = async () => {
    const { data, error } = await supabase.auth.signInWithOtp({
      email: formData.email,
      options: {
        emailRedirectTo: 'https://tradehub24.vercel.app/professional/login',
        data: {
          user_type: 'professional',
          phone: formData.phone,
          postcode: formData.postcode,
          companyName: formData.companyName,
          trade: formData.trade,
          businessRegistration: formData.businessRegistration,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      },
    });
    if (error) {
      alert(error.message);
    } else {
      alert('Check your email for the magic link!');
    }
  };

  // Google sign-up
  const handleSignUpWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'https://tradehub24.vercel.app/professional/login',
      },
    });
    if (error) alert(error.message);
  };

  // Standard email+password sign-up
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        emailRedirectTo: 'https://tradehub24.vercel.app/professional/login',
        data: {
          user_type: 'professional',
          phone: formData.phone,
          postcode: formData.postcode,
          companyName: formData.companyName,
          trade: formData.trade,
          businessRegistration: formData.businessRegistration,
          firstName: formData.firstName,
          lastName: formData.lastName,
        },
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert('Professional account created! Check your email to verify.');
      // navigate('/professional/login');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Heading */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Create your professional account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link to="/professional/login" className="font-medium text-[#105298] hover:text-blue-700">
            Sign in
          </Link>
        </p>
      </div>

      {/* Form */}
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
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                               placeholder-gray-400 focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
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
                    className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                               placeholder-gray-400 focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                  />
                </div>
              </div>
            </div>

            {/* Company Name */}
            <div>
              <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Briefcase className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="companyName"
                  name="companyName"
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Trade */}
            <div>
              <label htmlFor="trade" className="block text-sm font-medium text-gray-700">
                Primary Trade
              </label>
              <div className="mt-1">
                <select
                  id="trade"
                  name="trade"
                  required
                  value={formData.trade}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                >
                  <option value="">Select your trade</option>
                  <option value="electrician">Electrician</option>
                  <option value="plumber">Plumber</option>
                  <option value="carpenter">Carpenter</option>
                  <option value="painter">Painter & Decorator</option>
                  <option value="builder">Builder</option>
                  <option value="gardener">Gardener</option>
                </select>
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
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
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
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Postcode */}
            <div>
              <label htmlFor="postcode" className="block text-sm font-medium text-gray-700">
                Business Postcode
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
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Business Phone
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="appearance-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Business Registration */}
            <div>
              <label htmlFor="businessRegistration" className="block text-sm font-medium text-gray-700">
                Business Registration Number
              </label>
              <div className="mt-1 relative">
                <input
                  id="businessRegistration"
                  name="businessRegistration"
                  type="text"
                  value={formData.businessRegistration}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                             placeholder-gray-400 focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                  placeholder="Optional"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                           text-sm font-medium text-white bg-[#e20000] hover:bg-[#cc0000] 
                           focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#105298]"
              >
                Create Professional Account
              </button>
            </div>
          </form>

          {/* Additional Buttons (Email OTP, Google) */}
          <div className="mt-6 space-y-2">
            <button
              type="button"
              onClick={handleSignUpWithOTP}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm 
                         text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Sign Up with Email OTP
            </button>
            <button
              type="button"
              onClick={handleSignUpWithGoogle}
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm 
                         text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Sign Up with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalSignup;
