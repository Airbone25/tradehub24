// src/pages/professional/ProfessionalRegistrationStep2.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../services/supabaseClient';
import { toast } from 'react-toastify';
import { useUser } from '../../contexts/UserContext';

const ProfessionalRegistrationStep2 = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [formData, setFormData] = useState({
    companyName: '',
    registrationNumber: '',
    address: '',
    city: '',
    postcode: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error('User not authenticated');
      return;
    }

    try {
      // Insert or update "professionals" table with step2 data
      const { data, error } = await supabase
        .from('professionals')
        .update({
          company_name: formData.companyName,
          business_registration_number: formData.registrationNumber,
          address: formData.address,
          city: formData.city,
          postcode: formData.postcode,
        })
        .eq('user_id', user.id)
        .select()
        .single();

      if (error) throw error;
      toast.success('Step 2 saved!');
      navigate('/professional/registration-step3');
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8 text-center">
        <h2 className="text-3xl font-bold text-gray-900">Company Details</h2>
        <p className="mt-2 text-sm text-gray-600">
          Step 2 of 4
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-md rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Company Name
              </label>
              <input
                name="companyName"
                type="text"
                value={formData.companyName}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:ring-[#105298] focus:border-[#105298] sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Registration Number
              </label>
              <input
                name="registrationNumber"
                type="text"
                value={formData.registrationNumber}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:ring-[#105298] focus:border-[#105298] sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address
              </label>
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:ring-[#105298] focus:border-[#105298] sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                City
              </label>
              <input
                name="city"
                type="text"
                value={formData.city}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:ring-[#105298] focus:border-[#105298] sm:text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Postcode
              </label>
              <input
                name="postcode"
                type="text"
                value={formData.postcode}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm 
                  focus:ring-[#105298] focus:border-[#105298] sm:text-sm"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent 
                  rounded-md shadow-sm text-sm font-medium text-white bg-[#e20000] 
                  hover:bg-[#cc0000] focus:outline-none focus:ring-2 focus:ring-offset-2 
                  focus:ring-[#105298]"
              >
                Next Step
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalRegistrationStep2;
