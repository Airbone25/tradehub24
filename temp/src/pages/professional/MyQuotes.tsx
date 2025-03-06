import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, Clock, CheckCircle, XCircle, Filter, ChevronDown, DollarSign } from 'lucide-react';

const MyQuotes: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data
  const quotes = [
    { 
      id: '1', 
      jobTitle: 'Bathroom Renovation', 
      client: 'Michael Johnson',
      status: 'accepted', 
      date: '2025-03-15', 
      amount: '$4,200',
      description: 'Complete renovation of master bathroom including new fixtures, tiling, and plumbing.',
      category: 'Plumbing'
    },
    { 
      id: '2', 
      jobTitle: 'Kitchen Plumbing Fix', 
      client: 'Emily Davis',
      status: 'pending', 
      date: '2025-03-10', 
      amount: '$350',
      description: 'Fix leaking sink and install new garbage disposal unit.',
      category: 'Plumbing'
    },
    { 
      id: '3', 
      jobTitle: 'Electrical Rewiring', 
      client: 'Robert Wilson',
      status: 'pending', 
      date: '2025-03-05', 
      amount: '$1,800',
      description: 'Rewire living room and install new light fixtures.',
      category: 'Electrical'
    },
    { 
      id: '4', 
      jobTitle: 'Water Heater Installation', 
      client: 'Sarah Thompson',
      status: 'rejected', 
      date: '2025-02-20', 
      amount: '$1,200',
      description: 'Install new tankless water heater and remove old unit.',
      category: 'Plumbing'
    },
    { 
      id: '5', 
      jobTitle: 'Roof Inspection', 
      client: 'David Brown',
      status: 'expired', 
      date: '2025-02-15', 
      amount: '$250',
      description: 'Inspect roof for damage after recent storm.',
      category: 'Roofing'
    },
  ];

  const filteredQuotes = filter === 'all' 
    ? quotes 
    : quotes.filter(quote => quote.status === filter);

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'pending':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>;
      case 'accepted':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Accepted</span>;
      case 'rejected':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">Rejected</span>;
      case 'expired':
        return <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">Expired</span>;
      default:
        return null;
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      case 'expired':
        return <XCircle className="h-5 w-5 text-gray-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Quotes</h1>
        <p className="text-gray-600">Track and manage all your submitted quotes.</p>
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
                  All Quotes
                </button>
                <button
                  onClick={() => { setFilter('pending'); setIsFilterOpen(false); }}
                  className={`${filter === 'pending' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                  role="menuitem"
                >
                  Pending
                </button>
                <button
                  onClick={() => { setFilter('accepted'); setIsFilterOpen(false); }}
                  className={`${filter === 'accepted' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                  role="menuitem"
                >
                  Accepted
                </button>
                <button
                  onClick={() => { setFilter('rejected'); setIsFilterOpen(false); }}
                  className={`${filter === 'rejected' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                  role="menuitem"
                >
                  Rejected
                </button>
                <button
                  onClick={() => { setFilter('expired'); setIsFilterOpen(false); }}
                  className={`${filter === 'expired' ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                  role="menuitem"
                >
                  Expired
                </button>
              </div>
            </div>
          )}
        </div>

        <Link
          to="/professional/available-jobs"
          className="mt-3 sm:mt-0 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Find More Jobs
        </Link>
      </div>

      {/* Quotes List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        {filteredQuotes.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No quotes found with the selected filter.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredQuotes.map((quote) => (
              <li key={quote.id}>
                <Link to={`/professional/job/${quote.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {getStatusIcon(quote.status)}
                        <p className="ml-3 text-sm font-medium text-blue-600 truncate">{quote.jobTitle}</p>
                      </div>
                      <div className="ml-2 flex-shrink-0 flex">
                        {getStatusBadge(quote.status)}
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span className="truncate">Client: {quote.client}</span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <Clock className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>Submitted on {quote.date}</p>
                      </div>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex">
                        <p className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                            {quote.category}
                          </span>
                        </p>
                      </div>
                      <div className="mt-2 flex items-center text-sm font-medium text-gray-900 sm:mt-0">
                        <DollarSign className="flex-shrink-0 mr-1 h-4 w-4 text-gray-500" />
                        <p>{quote.amount}</p>
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

export default MyQuotes;