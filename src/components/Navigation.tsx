import React, { useState } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [userType, setUserType] = useState<'homeowner' | 'professional'>('homeowner');

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-[#105298] text-xl font-bold">TradeHub24</span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/how-it-works" className="text-gray-700 hover:text-[#105298]">How It Works</Link>
            <Link to="/services" className="text-gray-700 hover:text-[#105298]">Services</Link>
            <Link to="/professionals" className="text-gray-700 hover:text-[#105298]">Find Pros</Link>
            <div className="relative">
              <select 
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'homeowner' | 'professional')}
                className="appearance-none bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#105298]"
              >
                <option value="homeowner">For Homeowners</option>
                <option value="professional">For Professionals</option>
              </select>
            </div>
            <Link 
              to="/login" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#e20000] hover:bg-[#cc0000]"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/how-it-works" className="block px-3 py-2 text-gray-700">How It Works</Link>
            <Link to="/services" className="block px-3 py-2 text-gray-700">Services</Link>
            <Link to="/professionals" className="block px-3 py-2 text-gray-700">Find Pros</Link>
            <Link to="/login" className="block px-3 py-2 text-gray-700">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}