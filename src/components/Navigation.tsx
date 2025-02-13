import React, { useState, useEffect } from 'react';
import { Menu, X, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from '../assets/logo-image.png';
import logoName from '../assets/logo-name.png';

export function Navigation() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  
  // Retrieve stored user type or default to 'homeowner'
  const [userType, setUserType] = useState<'homeowner' | 'professional'>(
    localStorage.getItem('userType') as 'homeowner' | 'professional' || 'homeowner'
  );

  // Update localStorage & redirect when user type changes
  useEffect(() => {
    localStorage.setItem('userType', userType);
    navigate(userType === 'homeowner' ? '/' : '/professional');
  }, [userType, navigate]);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center space-x-2">
              <img src={logoImage} alt="Logo Icon" className="h-12 w-auto" />
              <img src={logoName} alt="Logo Text" className="h-8 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {userType === 'homeowner' ? (
              <>
                <Link to="/how-it-works" className="text-gray-700 hover:text-[#105298]">How It Works</Link>
                <Link to="/services" className="text-gray-700 hover:text-[#105298]">Services</Link>
                <Link to="/find-pros" className="text-gray-700 hover:text-[#105298]">Find Pros</Link>
              </>
            ) : (
              <>
                <Link to="/professional/dashboard" className="text-gray-700 hover:text-[#105298]">Dashboard</Link>
                <Link to="/professional/register" className="text-gray-700 hover:text-[#105298]">Register</Link>
                <Link to="/professional/professional-support" className="text-gray-700 hover:text-[#105298]">Support</Link>
              </>
            )}

            {/* User Type Toggle */}
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

            {/* Login Button */}
            <Link 
              to="/login" 
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-[#e20000] hover:bg-[#cc0000]"
            >
              <User className="h-4 w-4 mr-2" />
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* User Type Toggle (Mobile) */}
            <div className="px-3 py-2">
              <label className="block text-gray-700 text-sm font-medium mb-1">Switch User Type:</label>
              <select
                value={userType}
                onChange={(e) => setUserType(e.target.value as 'homeowner' | 'professional')}
                className="w-full bg-white border border-gray-300 rounded-md py-2 pl-3 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-[#105298]"
              >
                <option value="homeowner">For Homeowners</option>
                <option value="professional">For Professionals</option>
              </select>
            </div>

            {/* Mobile Navigation Links */}
            {userType === 'homeowner' ? (
              <>
                <Link to="/how-it-works" className="block px-3 py-2 text-gray-700">How It Works</Link>
                <Link to="/services" className="block px-3 py-2 text-gray-700">Services</Link>
                <Link to="/find-pros" className="block px-3 py-2 text-gray-700">Find Pros</Link>
              </>
            ) : (
              <>
                <Link to="/professional/dashboard" className="block px-3 py-2 text-gray-700">Dashboard</Link>
                <Link to="/professional/register" className="block px-3 py-2 text-gray-700">Register</Link>
                <Link to="/professional/professional-support" className="block px-3 py-2 text-gray-700">Support</Link>
              </>
            )}
            
            <Link to="/login" className="block px-3 py-2 text-gray-700">Login</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
