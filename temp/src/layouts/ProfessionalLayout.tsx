import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { useUser } from '../contexts/UserContext';
import { Home, Briefcase, MessageSquare, Settings, LogOut, User, CreditCard } from 'lucide-react';

const ProfessionalLayout: React.FC = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0">
              <img src="https://via.placeholder.com/150x50?text=TradeHub24" alt="TradeHub24" className="h-8" />
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <button className="flex items-center space-x-2 text-sm focus:outline-none">
                <img 
                  src={user?.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
                  alt="Profile" 
                  className="h-8 w-8 rounded-full"
                />
                <span className="font-medium text-gray-700">{user?.name || 'User'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white rounded-lg shadow">
            <nav className="p-4 space-y-1">
              <Link 
                to="/professional" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/professional') && !isActive('/professional/') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Home className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
              <Link 
                to="/professional/available-jobs" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/professional/available-jobs') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Briefcase className="mr-3 h-5 w-5" />
                Available Jobs
              </Link>
              <Link 
                to="/professional/my-quotes" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/professional/my-quotes') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Briefcase className="mr-3 h-5 w-5" />
                My Quotes
              </Link>
              <Link 
                to="/professional/messages" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/professional/messages') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <MessageSquare className="mr-3 h-5 w-5" />
                Messages
              </Link>
              <Link 
                to="/professional/profile" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/professional/profile') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <User className="mr-3 h-5 w-5" />
                Profile
              </Link>
              <Link 
                to="/professional/subscription" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/professional/subscription') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <CreditCard className="mr-3 h-5 w-5" />
                Subscription
              </Link>
              <Link 
                to="/professional/settings" 
                className={`flex items-center px-3 py-2 text-sm font-medium rounded-md ${isActive('/professional/settings') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'}`}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Logout
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="flex-1 bg-white rounded-lg shadow">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalLayout;