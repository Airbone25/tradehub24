import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signUpWithEmail } from '../../services/authService';
import { Mail, Lock, User, MapPin, Phone } from 'lucide-react';

const HomeownerSignUp = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email) {
      toast.error('Please enter your email');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const { data, error } = await signUpWithEmail(
      formData.email,
      formData.password,
      'homeowner'
    );

    if (error) {
      const lowerErr = error.toLowerCase();
      if (
        lowerErr.includes('already registered') ||
        lowerErr.includes('duplicate key') ||
        lowerErr.includes('exists')
      ) {
        toast.error('Email already exists. Please log in.');
        navigate('/homeowner/login');
      } else {
        toast.error(error);
      }
    } else {
      toast.success('Account created! Please check your email to verify.');
      // Redirect to Please Confirm Email page with email in state
      navigate('/auth/please-confirm-email', { state: { email: formData.email } });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Title */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-center text-3xl font-bold text-gray-900">
          Create your homeowner account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link
            to="/homeowner/login"
            className="font-medium text-[#105298] hover:text-blue-700"
          >
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
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700"
                >
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                      focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700"
                >
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
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
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
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700"
              >
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
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
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
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
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm 
                    focus:outline-none focus:ring-[#105298] focus:border-[#105298]"
                />
              </div>
            </div>

            {/* Submit */}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm 
                  text-sm font-medium text-white bg-[#e20000] hover:bg-[#cc0000] focus:outline-none 
                  focus:ring-2 focus:ring-offset-2 focus:ring-[#105298]"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeownerSignUp;
