import React from 'react';
import { Bell, MessageSquare, Briefcase, Star, Settings, ChevronRight } from 'lucide-react';

export function ProfessionalDashboard() {
  return (
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, John</h1>
          <p className="text-gray-600">Here's what's happening with your business</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.iconBg}`}>
                  {stat.icon}
                </div>
                <span className={`text-sm font-medium ${stat.trend.color}`}>
                  {stat.trend.value}
                </span>
              </div>
              <h3 className="text-2xl font-bold">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Job Requests</h2>
                <button className="text-[#105298] hover:text-[#0c3d72] text-sm font-medium">
                  View all
                </button>
              </div>
              <div className="space-y-6">
                {jobRequests.map((job, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0">
                    <div>
                      <h3 className="font-semibold">{job.title}</h3>
                      <p className="text-sm text-gray-600">{job.location}</p>
                      <p className="text-sm text-gray-500">{job.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <button className="px-4 py-2 bg-[#105298] text-white rounded-md hover:bg-[#0c3d72]">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Recent Messages</h2>
                <button className="text-[#105298] hover:text-[#0c3d72] text-sm font-medium">
                  View all
                </button>
              </div>
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div key={index} className="flex items-center justify-between border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center">
                      <img
                        src={message.avatar}
                        alt={message.name}
                        className="w-10 h-10 rounded-full mr-4"
                      />
                      <div>
                        <h3 className="font-semibold">{message.name}</h3>
                        <p className="text-sm text-gray-600">{message.preview}</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{message.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="space-y-4">
                {quickActions.map((action, index) => (
                  <button
                    key={index}
                    className="w-full flex items-center justify-between p-4 rounded-lg hover:bg-gray-50"
                  >
                    <div className="flex items-center">
                      {action.icon}
                      <span className="ml-3 font-medium">{action.label}</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold mb-6">Recent Reviews</h2>
              <div className="space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4 last:border-0">
                    <div className="flex items-center mb-2">
                      <Star className="w-5 h-5 text-yellow-400" />
                      <span className="ml-2 font-semibold">{review.rating}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{review.comment}</p>
                    <p className="text-gray-500 text-sm mt-2">{review.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const stats = [
  {
    label: 'New Leads',
    value: '12',
    icon: <Bell className="w-6 h-6 text-blue-600" />,
    iconBg: 'bg-blue-100',
    trend: { value: '+2.5%', color: 'text-green-500' }
  },
  {
    label: 'Active Jobs',
    value: '4',
    icon: <Briefcase className="w-6 h-6 text-green-600" />,
    iconBg: 'bg-green-100',
    trend: { value: '0%', color: 'text-gray-500' }
  },
  {
    label: 'Messages',
    value: '8',
    icon: <MessageSquare className="w-6 h-6 text-purple-600" />,
    iconBg: 'bg-purple-100',
    trend: { value: '+5.0%', color: 'text-green-500' }
  },
  {
    label: 'Rating',
    value: '4.8',
    icon: <Star className="w-6 h-6 text-yellow-600" />,
    iconBg: 'bg-yellow-100',
    trend: { value: '+0.2', color: 'text-green-500' }
  }
];

const jobRequests = [
  {
    title: 'Bathroom Renovation',
    location: 'Manchester, M1',
    date: '2h ago',
  },
  {
    title: 'Kitchen Plumbing',
    location: 'Liverpool, L1',
    date: '4h ago',
  },
  {
    title: 'Boiler Repair',
    location: 'Leeds, LS1',
    date: '6h ago',
  }
];

const messages = [
  {
    name: 'Sarah Johnson',
    preview: 'Hi, I\'d like to discuss the quote...',
    time: '10m ago',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  },
  {
    name: 'Michael Brown',
    preview: 'When can you start the work?',
    time: '1h ago',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  }
];

const quickActions = [
  {
    label: 'Update Profile',
    icon: <Settings className="w-5 h-5 text-gray-400" />
  },
  {
    label: 'Submit Quote',
    icon: <Briefcase className="w-5 h-5 text-gray-400" />
  },
  {
    label: 'View Messages',
    icon: <MessageSquare className="w-5 h-5 text-gray-400" />
  }
];

const reviews = [
  {
    rating: 5.0,
    comment: 'Excellent work, very professional and tidy.',
    author: 'John D.'
  },
  {
    rating: 4.5,
    comment: 'Great service, would recommend.',
    author: 'Emma S.'
  }
];