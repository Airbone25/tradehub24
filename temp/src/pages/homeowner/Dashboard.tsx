import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Clock, CheckCircle, AlertCircle, PlusCircle } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Dashboard: React.FC = () => {
  const { user } = useUser();

  // Mock data
  const stats = [
    { name: 'Active Jobs', value: 3, icon: <Briefcase className="h-6 w-6 text-blue-600" /> },
    { name: 'Pending Quotes', value: 7, icon: <Clock className="h-6 w-6 text-yellow-500" /> },
    { name: 'Completed Jobs', value: 12, icon: <CheckCircle className="h-6 w-6 text-green-500" /> },
    { name: 'Unread Messages', value: 4, icon: <AlertCircle className="h-6 w-6 text-red-500" /> },
  ];

  const recentJobs = [
    { id: '1', title: 'Bathroom Renovation', status: 'In Progress', date: '2025-03-15', quotes: 3 },
    { id: '2', title: 'Kitchen Plumbing Fix', status: 'Pending Quotes', date: '2025-03-10', quotes: 2 },
    { id: '3', title: 'Electrical Rewiring', status: 'Open', date: '2025-03-05', quotes: 0 },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's what's happening with your projects.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
            <div className="flex items-center">
              <div className="mr-4">{stat.icon}</div>
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Jobs */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Jobs</h2>
          <Link to="/homeowner/post-job" className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
            <PlusCircle className="mr-1.5 h-4 w-4" />
            Post a Job
          </Link>
        </div>
        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {recentJobs.map((job) => (
              <li key={job.id}>
                <Link to={`/homeowner/job/${job.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">{job.title}</p>
                      <div className="ml-2 flex-shrink-0 flex">
                        <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${job.status === 'In Progress' ? 'bg-green-100 text-green-800' : 
                            job.status === 'Pending Quotes' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {job.status}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="flex items-center text-sm text-gray-500">
                          <Briefcase className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          {job.quotes} quotes received
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>Posted on {job.date}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="mt-4 text-center">
          <Link to="/homeowner/my-jobs" className="text-sm font-medium text-blue-600 hover:text-blue-500">
            View all jobs
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link to="/homeowner/post-job" className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50">
            <div className="flex flex-col items-center text-center">
              <PlusCircle className="h-8 w-8 text-red-600 mb-2" />
              <h3 className="text-sm font-medium text-gray-900">Post a New Job</h3>
              <p className="mt-1 text-xs text-gray-500">Create a new job request for professionals</p>
            </div>
          </Link>
          <Link to="/homeowner/find-professionals" className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50">
            <div className="flex flex-col items-center text-center">
              <Briefcase className="h-8 w-8 text-blue-600 mb-2" />
              <h3 className="text-sm font-medium text-gray-900">Find Professionals</h3>
              <p className="mt-1 text-xs text-gray-500">Browse and connect with qualified professionals</p>
            </div>
          </Link>
          <Link to="/homeowner/messages" className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm hover:bg-gray-50">
            <div className="flex flex-col items-center text-center">
              <MessageSquare className="h-8 w-8 text-green-600 mb-2" />
              <h3 className="text-sm font-medium text-gray-900">Messages</h3>
              <p className="mt-1 text-xs text-gray-500">Check your conversations with professionals</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;