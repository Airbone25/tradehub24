import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Clock, CheckCircle, AlertCircle, DollarSign, User, Star } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Dashboard: React.FC = () => {
  const { user } = useUser();

  // Mock data
  const stats = [
    { name: 'Active Jobs', value: 4, icon: <Briefcase className="h-6 w-6 text-blue-600" /> },
    { name: 'Pending Quotes', value: 8, icon: <Clock className="h-6 w-6 text-yellow-500" /> },
    { name: 'Completed Jobs', value: 23, icon: <CheckCircle className="h-6 w-6 text-green-500" /> },
    { name: 'Unread Messages', value: 5, icon: <AlertCircle className="h-6 w-6 text-red-500" /> },
  ];

  const activeJobs = [
    { 
      id: '1', 
      title: 'Bathroom Renovation', 
      client: 'Michael Johnson',
      status: 'In Progress', 
      date: '2025-03-15', 
      amount: '$4,200',
      location: 'Anytown, USA'
    },
    { 
      id: '2', 
      title: 'Kitchen Sink Repair', 
      client: 'Emily Davis',
      status: 'Scheduled', 
      date: '2025-03-18', 
      amount: '$350',
      location: 'Anytown, USA'
    },
    { 
      id: '3', 
      title: 'Water Heater Installation', 
      client: 'Robert Wilson',
      status: 'In Progress', 
      date: '2025-03-12', 
      amount: '$1,200',
      location: 'Anytown, USA'
    },
    { 
      id: '4', 
      title: 'Pipe Leak Repair', 
      client: 'Sarah Thompson',
      status: 'Scheduled', 
      date: '2025-03-20', 
      amount: '$280',
      location: 'Anytown, USA'
    },
  ];

  const recentReviews = [
    {
      id: '1',
      client: 'Michael Johnson',
      job: 'Bathroom Renovation',
      rating: 5,
      comment: 'Excellent work! Very professional and completed the job on time.',
      date: '2025-03-10'
    },
    {
      id: '2',
      client: 'Emily Davis',
      job: 'Kitchen Plumbing',
      rating: 4,
      comment: 'Good service, fixed our sink issue quickly.',
      date: '2025-03-05'
    }
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user?.name}!</h1>
        <p className="text-gray-600">Here's an overview of your business activity.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Jobs */}
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Active Jobs</h2>
            <Link to="/professional/available-jobs" className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all jobs
            </Link>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {activeJobs.map((job) => (
                <li key={job.id}>
                  <Link to={`/professional/job/${job.id}`} className="block hover:bg-gray-50">
                    <div className="px-4 py-4 sm:px-6">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-blue-600 truncate">{job.title}</p>
                        <div className="ml-2 flex-shrink-0 flex">
                          <p className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${job.status === 'In Progress' ? 'bg-green-100 text-green-800' : 
                              job.status === 'Scheduled' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-blue-100 text-blue-800'}`}>
                            {job.status}
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 sm:flex sm:justify-between">
                        <div className="sm:flex">
                          <p className="flex items-center text-sm text-gray-500">
                            <User className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                            {job.client}
                          </p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{job.amount}</p>
                        </div>
                      </div>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Recent Reviews */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium text-gray-900">Recent Reviews</h2>
          </div>
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            {recentReviews.length === 0 ? (
              <div className="p-6 text-center">
                <p className="text-gray-500">No reviews yet.</p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200">
                {recentReviews.map((review) => (
                  <li key={review.id} className="p-4">
                    <div className="flex justify-between">
                      <p className="text-sm font-medium text-gray-900">{review.client}</p>
                      <p className="text-sm text-gray-500">{review.date}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{review.job}</p>
                    <div className="mt-1 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill={i < review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-600">{review.comment}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Subscription Status */}
      <div className="mt-8 bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
          <div>
            <h2 className="text-lg font-medium text-gray-900">Subscription Status</h2>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">Your current plan and usage.</p>
          </div>
          <Link
            to="/professional/subscription"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Manage Subscription
          </Link>
        </div>
        <div className="border-t border-gray-200">
          <dl>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Current Plan</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">Premium</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Renewal Date</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">April 15, 2025</dd>
            </div>
            <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Monthly Fee</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">$49.99</dd>
            </div>
            <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
              <dt className="text-sm font-medium text-gray-500">Features</dt>
              <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="ml-2 flex-1 w-0 truncate">Unlimited job access</span>
                    </div>
                  </li>
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="ml-2 flex-1 w-0 truncate">Featured profile listing</span>
                    </div>
                  </li>
                  <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                    <div className="w-0 flex-1 flex items-center">
                      <CheckCircle className="flex-shrink-0 h-5 w-5 text-green-500" />
                      <span className="ml-2 flex-1 w-0 truncate">Priority customer support</span>
                    </div>
                  </li>
                </ul>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;