import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Clock, CheckCircle, XCircle, Filter, ChevronDown } from 'lucide-react';

const MyJobs: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data
  const jobs = [
    { 
      id: '1', 
      title: 'Bathroom Renovation', 
      status: 'in-progress', 
      date: '2025-03-15', 
      quotes: 3,
      description: 'Complete renovation of master bathroom including new fixtures, tiling, and plumbing.',
      category: 'Plumbing'
    },
    { 
      id: '2', 
      title: 'Kitchen Plumbing Fix', 
      status: 'pending', 
      date: '2025-03-10', 
      quotes: 2,
      description: 'Fix leaking sink and install new garbage disposal unit.',
      category: 'Plumbing'
    },
    { 
      id: '3', 
      title: 'Electrical Rewiring', 
      status: 'open', 
      date: '2025-03-05', 
      quotes: 0,
      description: 'Rewire living room and install new light fixtures.',
      category: 'Electrical'
    },
    { 
      id: '4', 
      title: 'Deck Repair', 
      status: 'completed', 
      date: '2025-02-20', 
      quotes: 4,
      description: 'Repair damaged deck boards and railings, then stain the entire deck.',
      category: 'Carpentry'
    },
    { 
      id: '5', 
      title: 'Roof Inspection', 
      status: 'cancelled', 
      date: '2025-02-15', 
      quotes: 1,
      description: 'Inspect roof for damage after recent storm.',
      category: 'Roofing'
    },
  ];

  const filteredJobs = filter === 'all' 
    ? jobs 
    : jobs.filter(job => job.status === filter);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'open':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">Open</span>;
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending Quotes</span>;
      case 'in-progress':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">In Progress</span>;
      case 'completed':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-purple-100 text-purple-800">Completed</span>;
      case 'cancelled':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Cancelled</span>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'open':
        return <Briefcase className="h-5 w-5 text-blue-500" />;
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'in-progress':
        return <Briefcase className="h-5 w-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-purple-500" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Jobs</h1>
        <p className="text-gray-600">Manage and track all your job requests.</p>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center justify-between">
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
              <Filter className="mr-2 h-5 w-5 text-gray-400" />
              Filter by Status
              <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
            </button>
          </div>

          {isFilterOpen && (
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
              <div className="py-1" role="menu" aria-orientation="vertical">
                <button
                  onClick={() => { setFilter('all'); setIsFilterOpen(false); }}
                  className={`${filter === 'all' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                  role="menuitem"
                >
                  All Jobs
                </button>
                <button
                  onClick={() => { setFilter('open'); setIsFilterOpen(false); }}
                  className={`${filter === 'open' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                  role="menuitem"
                >
                  Open
                </button>
                <button
                  onClick={() => { setFilter('pending'); setIsFilterOpen(false); }}
                  className={`${filter === 'pending' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                  role="menuitem"
                >
                  Pending Quotes
                </button>
                <button
                  onClick={() => { setFilter('in-progress'); setIsFilterOpen(false); }}
                  className={`${filter === 'in-progress' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                  role="menuitem"
                >
                  In Progress
                </button>
                <button
                  onClick={() => { setFilter('completed'); setIsFilterOpen(false); }}
                  className={`${filter === 'completed' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                  role="menuitem"
                >
                  Completed
                </button>
                <button
                  onClick={() => { setFilter('cancelled'); setIsFilterOpen(false); }}
                  className={`${filter === 'cancelled' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                  role="menuitem"
                >
                  Cancelled
                </button>
              </div>
            </div>
          )}
        </div>

        <Link
          to="/homeowner/post-job"
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Post New Job
        </Link>
      </div>

      {/* Jobs List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredJobs.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No jobs found with the selected filter.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <li key={job.id}>
                <Link to={`/homeowner/job/${job.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getStatusIcon(job.status)}
                        <p className="ml-3 text-sm font-medium text-blue-600 truncate">{job.title}</p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        {getStatusBadge(job.status)}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span className="truncate">{job.description.substring(0, 60)}...</span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>Posted on {job.date}</p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {job.category}
                          </span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <p>{job.quotes} quotes received</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MyJobs;