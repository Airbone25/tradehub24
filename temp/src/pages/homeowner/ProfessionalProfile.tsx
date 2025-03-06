import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, MapPin, Phone, Mail, Calendar, Briefcase, 
  Shield, Award, CheckCircle, MessageSquare 
} from 'lucide-react';

const ProfessionalProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // Mock data
  const professional = {
    id,
    name: 'John Smith',
    company: 'Smith Plumbing',
    category: 'Plumbing',
    rating: 4.8,
    reviews: 56,
    location: 'Anytown, USA',
    distance: '3.2 miles away',
    phone: '(555) 123-4567',
    email: 'john@smithplumbing.com',
    description: 'Professional plumber with 15 years of experience in residential and commercial plumbing services. Specializing in repairs, installations, and maintenance.',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    verified: true,
    memberSince: 'January 2023',
    completedJobs: 87,
    services: [
      'Pipe Repairs',
      'Fixture Installation',
      'Drain Cleaning',
      'Water Heater Installation',
      'Bathroom Remodeling',
      'Kitchen Plumbing'
    ],
    certifications: [
      'Licensed Master Plumber',
      'Certified Backflow Tester',
      'Green Plumbing Certification'
    ],
    portfolioImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1564540583246-934409427776?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1552143233-c29bb1292978?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80'
    ],
    reviews: [
      {
        id: '1',
        user: 'Michael Johnson',
        rating: 5,
        date: '2025-02-15',
        comment: 'John did an excellent job fixing our leaking pipes. He was prompt, professional, and very knowledgeable. Highly recommend!'
      },
      {
        id: '2',
        user: 'Emily Davis',
        rating: 4,
        date: '2025-01-20',
        comment: 'Great service! John installed a new water heater for us and was very thorough in explaining the process and maintenance tips.'
      },
      {
        id: '3',
        user: 'Robert Wilson',
        rating: 5,
        date: '2024-12-10',
        comment: 'Very professional and efficient. Fixed our bathroom plumbing issues quickly and at a reasonable price.'
      }
    ]
  };

  return (
    <div className="p-6">
      {/* Professional Header */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
        <div className="px-4 py-5 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center">
              <img className="h-16 w-16 rounded-full mr-4" src={professional.image} alt={professional.name} />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{professional.name}</h1>
                <p className="text-sm text-gray-600">{professional.company}</p>
                <div className="flex items-center mt-1">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="ml-1 text-sm text-gray-600">{professional.rating} ({professional.reviews} reviews)</span>
                  {professional.verified && (
                    <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Verified
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="mt-4 sm:mt-0 flex space-x-3">
              <Link
                to={`/homeowner/messages?professional=${professional.id}`}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Message
              </Link>
              <Link
                to="/homeowner/post-job"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <Briefcase className="mr-2 h-4 w-4" />
                Invite to Job
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column - Contact & Info */}
        <div className="md:col-span-1">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Contact Information</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{professional.location} ({professional.distance})</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <a href={`tel:${professional.phone}`} className="text-sm text-blue-600 hover:underline">{professional.phone}</a>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-gray-400 mr-2" />
                  <a href={`mailto:${professional.email}`} className="text-sm text-blue-600 hover:underline">{professional.email}</a>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Professional Details</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Member since {professional.memberSince}</span>
                </div>
                <div className="flex items-center">
                  <Briefcase className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">{professional.completedJobs} jobs completed</span>
                </div>
                <div className="flex items-center">
                  <Shield className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm text-gray-600">Insured & Bonded</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Services Offered</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="space-y-2">
                {professional.services.map((service, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    <span className="text-sm text-gray-600">{service}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - About, Portfolio, Reviews */}
        <div className="md:col-span-2">
          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">About</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <p className="text-sm text-gray-600">{professional.description}</p>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Certifications</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="space-y-2">
                {professional.certifications.map((cert, index) => (
                  <div key={index} className="flex items-center">
                    <Award className="h-4 w-4 text-blue-500 mr-2" />
                    <span className="text-sm text-gray-600">{cert}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-6">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Portfolio</h2>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {professional.portfolioImages.map((image, index) => (
                  <div key={index} className="relative">
                    <img src={image} alt={`Portfolio image ${index + 1}`} className="h-40 w-full object-cover rounded-md" />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="px-4 py-5 sm:px-6">
              <h2 className="text-lg font-medium text-gray-900">Reviews</h2>
            </div>
            <div className="border-t border-gray-200">
              <ul className="divide-y divide-gray-200">
                {professional.reviews.map((review) => (
                  <li key={review.id} className="px-4 py-5 sm:px-6">
                    <div className="flex justify-between">
                      <div className="text-sm font-medium text-gray-900">{review.user}</div>
                      <div className="text-sm text-gray-500">{review.date}</div>
                    </div>
                    <div className="mt-1 flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`h-4 w-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`} 
                          fill={i < review.rating ? 'currentColor' : 'none'}
                        />
                      ))}
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      {review.comment}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalProfile;