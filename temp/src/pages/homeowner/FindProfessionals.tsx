import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, Filter, ChevronDown, Briefcase } from 'lucide-react';

const FindProfessionals: React.FC = () => {
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

  const professionals = [
    {
      id: '101',
      name: 'John Smith',
      company: 'Smith Plumbing',
      category: 'Plumbing',
      rating: 4.8,
      reviews: 56,
      location: 'Anytown, USA',
      distance: '3.2 miles away',
      description: 'Professional plumber with 15 years of experience in residential and commercial plumbing services.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '102',
      name: 'Sarah Johnson',
      company: 'Johnson Home Improvements',
      category: 'General Contracting',
      rating: 4.9,
      reviews: 42,
      location: 'Anytown, USA',
      distance: '5.7 miles away',
      description: 'Full-service home improvement contractor specializing in kitchen and bathroom remodels.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '103',
      name: 'Mike Davis',
      company: 'Davis Electrical',
      category: 'Electrical',
      rating: 4.7,
      reviews: 38,
      location: 'Anytown, USA',
      distance: '2.1 miles away',
      description: 'Licensed electrician providing residential and commercial electrical services.',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '104',
      name: 'Lisa Brown',
      company: "Brown Painting",
      category: 'Painting',
      rating: 4.6,
      reviews: 29,
      location: 'Anytown, USA',
      distance: '4.3 miles away',
      description: 'Professional painter offering interior and exterior painting services for residential and commercial properties.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    },
    {
      id: '105',
      name: 'Robert Wilson',
      company: 'Wilson Roofing',
      category: 'Roofing',
      rating: 4.5,
      reviews: 31,
      location: 'Anytown, USA',
      distance: '6.8 miles away',
      description: 'Experienced roofing contractor specializing in roof repairs, replacements, and inspections.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    }
  ];

  const filteredProfessionals = professionals.filter(pro => {
    const matchesSearch = searchTerm === '' || 
      pro.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      pro.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pro.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = category === '' || category === 'All Categories' || pro.category === category;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Find Professionals</h1>
        <p className="text-gray-600">Connect with qualified trade professionals in your area.</p>
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
                placeholder="Search by name, company, or service..."
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

      {/* Professionals List */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        {filteredProfessionals.length === 0 ? (
          <div className="p-6 text-center">
            <p className="text-gray-500">No professionals found matching your criteria.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-200">
            {filteredProfessionals.map((pro) => (
              <li key={pro.id}>
                <Link to={`/homeowner/professional/${pro.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <img className="h-12 w-12 rounded-full" src={pro.image} alt="" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-blue-600">{pro.name}</p>
                          <p className="text-sm text-gray-500">{pro.company}</p>
                          <div className="flex items-center mt-1">
                            <Star className="h-4 w-4 text-yellow-400" />
                            <span className="ml-1 text-sm text-gray-600">{pro.rating} ({pro.reviews} reviews)</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                          {pro.category}
                        </span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <p className="text-sm text-gray-600">{pro.description}</p>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <MapPin className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                        <p>{pro.distance}</p>
                      </div>
                      <button className="inline-flex items-center px-3 py-1 border border-transparent text-xs font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <Briefcase className="mr-1.5 h-3 w-3" />
                        Invite to Job
                      </button>
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

export default FindProfessionals;