import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, DollarSign, Filter, ChevronDown, Briefcase } from 'lucide-react';

const AvailableJobs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Mock data
  const categories = [
    'All Categories',
    'Plumbing',
    'Electrical',
    'Carpentry',
    'Painting',
    'Roofing',
    'Landscaping',
    'HVAC',
    'General Contracting'
  ];

  const jobs = [
    {
      id: '1',
      title: 'Bathroom Renovation',
      client: 'Michael Johnson',
      category: 'Plumbing',
      location: 'Anytown, USA',
      distance: '3.2 miles away',
      date: '2025-03-15',
      timeframe: 'Within a month',
      budget: '$3,000 - $5,000',
      description: 'Complete renovation of master bathroom including new fixtures, tiling, and plumbing. Need to replace the bathtub, toilet, sink, and all fixtures.'
    },
    {
      id: '2',
      title: 'Kitchen Plumbing Fix',
      client: 'Emily Davis',
      category: 'Plumbing',
      location: 'Anytown, USA',
      distance: '5.7 miles away',
      date: '2025-03-10',
      timeframe: 'Within a week',
      budget: '$200 - $500',
      description: 'Fix leaking sink and install new garbage disposal unit.'
    },
    {
      id: '3',
      title: 'Electrical Rewiring',
      client: 'Robert Wilson',
      category: 'Electrical',
      location: 'Anytown, USA',
      distance: '2.1 miles away',
      date: '2025-03-05',
      timeframe: 'Within two weeks',
      budget: '$1,500 - $2,500',
      description: 'Rewire living room and install new light fixtures.'
    },
    {
      id: '4',
      title: 'Exterior House Painting',
      client: 'Lisa Brown',
      category: 'Painting',
      location: 'Anytown, USA',
      distance: '4.3 miles away',
      date: '2025-03-12',
      timeframe: 'Within a month',
      budget: '$2,000 - $3,500',
      description: 'Paint exterior of two-story house, including trim and doors. House is approximately 2,500 sq ft.'
    },
    {
      id: '5',
      title: 'Roof Repair After Storm',
      client: 'David Miller',
      category: 'Roofing',
      location: 'Anytown, USA',
      distance: '6.8 miles away',
      date: '2025-03-08',
      timeframe: 'Immediately',
      budget: '$500 - $1,500',
      description: 'Repair roof damage from recent storm. Several shingles missing and possible leak in attic.'
    }
  ];

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = searchTerm === '' || 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === '' || category === 'All Categories' || job.category === category;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Available Jobs</h1>
        <p className="text-gray-600">Browse and find jobs that match your skills and location.</p>
      </div>

      {/* Search and Filters */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                placeholder="Search jobs by title or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="mr-2 h-5 w-5 text-gray-400" />
                {category || 'All Categories'}
                <ChevronDown className="ml-2 h-5 w-5 text-gray-400" />
              </button>
            </div>

            {isFilterOpen && (
              <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1" role="menu" aria-orientation="vertical">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => { setCategory(cat === 'All Categories' ? '' : cat); setIsFilterOpen(false); }}
                      className={`${category === cat ? 'bg-gray-100 text-gray-900' : 'text-gray-700'} block w-full text-left px-4 py-2 text-sm hover:bg-gray-100`}
                      role="menuitem"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Jobs List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {filteredJobs.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No jobs found matching your criteria.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredJobs.map((job) => (
              <li key={job.id}>
                <div className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 truncate">{job.title}</p>
                      <div>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {job.category}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">{job.description}</p>
                    </div>
                    <div className="mt-2 sm:flex sm:justify-between">
                      <div className="sm:flex sm:space-x-4">
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{job.distance}</p>
                        </div>
                        <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                          <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                          <p>{job.timeframe}</p>
                        </div>
                      </div>
                      <div className="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                        <DollarSign className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>{job.budget}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                      <Link
                        to={`/professional/job/${job.id}`}
                        className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-2"
                      >
                        View Details
                      </Link>
                      <button className="inline-flex items-center px-3 py-1.5 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Briefcase className="mr-1.5 h-4 w-4" />
                        Submit Quote
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default AvailableJobs;