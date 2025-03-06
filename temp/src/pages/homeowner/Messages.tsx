import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Send, Paperclip, Search, Phone, Video } from 'lucide-react';
import { useUser } from '../../contexts/UserContext';

const Messages: React.FC = () => {
  const { user } = useUser();
  const location = useLocation();
  const messageEndRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeConversation, setActiveConversation] = useState<string | null>(null);

  // Parse query params to see if we should open a specific conversation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const professionalId = params.get('professional');
    if (professionalId) {
      setActiveConversation(professionalId);
    }
  }, [location]);

  // Mock data
  const conversations = [
    {
      id: '101',
      professional: {
        id: '101',
        name: 'John Smith',
        company: 'Smith Plumbing',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        online: true
      },
      lastMessage: {
        text: "I can come by tomorrow at 2pm to take a look at your bathroom.",
        time: '10:30 AM',
        unread: true
      },
      messages: [
        {
          id: '1',
          sender: 'professional',
          text: "Hello! I saw your job posting for bathroom renovation. I am interested in providing a quote.",
          time: '9:15 AM',
          date: '2025-03-15'
        },
        {
          id: '2',
          sender: 'homeowner',
          text: "Hi John, thanks for reaching out! Can you tell me more about your experience with bathroom renovations?",
          time: '9:20 AM',
          date: '2025-03-15'
        },
        {
          id: '3',
          sender: 'professional',
          text: "I have been doing bathroom renovations for over 15 years. I specialize in modern designs and can handle everything from plumbing to tiling.",
          time: '9:25 AM',
          date: '2025-03-15'
        },
        {
          id: '4',
          sender: 'homeowner',
          text: "That sounds great! Would you be able to come by and take a look at the bathroom to provide a quote?",
          time: '9:45 AM',
          date: '2025-03-15'
        },
        {
          id: '5',
          sender: 'professional',
          text: "I can come by tomorrow at 2pm to take a look at your bathroom.",
          time: '10:30 AM',
          date: '2025-03-15'
        }
      ]
    },
    {
      id: '102',
      professional: {
        id: '102',
        name: 'Sarah Johnson',
        company: 'Johnson Home Improvements',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        online: false
      },
      lastMessage: {
        text: "I have submitted a quote for your kitchen plumbing job.",
        time: 'Yesterday',
        unread: false
      },
      messages: [
        {
          id: '1',
          sender: 'professional',
          text: "Hello! I am interested in your kitchen plumbing job.",
          time: '2:15 PM',
          date: '2025-03-14'
        },
        {
          id: '2',
          sender: 'homeowner',
          text: "Hi Sarah, thanks for your interest. What is your availability like?",
          time: '2:30 PM',
          date: '2025-03-14'
        },
        {
          id: '3',
          sender: 'professional',
          text: "I can fit you in next week, either Tuesday or Wednesday.",
          time: '3:00 PM',
          date: '2025-03-14'
        },
        {
          id: '4',
          sender: 'homeowner',
          text: "Tuesday would work well for me. Can you provide a quote?",
          time: '3:15 PM',
          date: '2025-03-14'
        },
        {
          id: '5',
          sender: 'professional',
          text: "I have submitted a quote for your kitchen plumbing job.",
          time: '5:30 PM',
          date: '2025-03-14'
        }
      ]
    },
    {
      id: '103',
      professional: {
        id: '103',
        name: 'Mike Davis',
        company: 'Davis Electrical',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        online: true
      },
      lastMessage: {
        text: "The rewiring job is complete. Please let me know if you have any questions.",
        time: 'Mar 10',
        unread: false
      },
      messages: [
        {
          id: '1',
          sender: 'professional',
          text: "I have finished the electrical rewiring job.",
          time: '4:15 PM',
          date: '2025-03-10'
        },
        {
          id: '2',
          sender: 'homeowner',
          text: "That was quick! Everything working properly?",
          time: '4:30 PM',
          date: '2025-03-10'
        },
        {
          id: '3',
          sender: 'professional',
          text: "Yes, I have tested all circuits and everything is working perfectly.",
          time: '4:45 PM',
          date: '2025-03-10'
        },
        {
          id: '4',
          sender: 'professional',
          text: "The rewiring job is complete. Please let me know if you have any questions.",
          time: '5:00 PM',
          date: '2025-03-10'
        }
      ]
    }
  ];

  // Scroll to bottom of messages
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation]);

  const filteredConversations = conversations.filter(conv => 
    conv.professional.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.professional.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeConvo = conversations.find(conv => conv.id === activeConversation);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    // In a real app, you would send this message to your backend
    console.log('Sending message:', message);
    setMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex h-[calc(100vh-12rem)]">
      {/* Conversation List */}
      <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
        <div className="p-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search conversations"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ul className="divide-y divide-gray-200">
          {filteredConversations.map((conv) => (
            <li 
              key={conv.id}
              className={`hover:bg-gray-50 cursor-pointer ${activeConversation === conv.id ? 'bg-blue-50' : ''}`}
              onClick={() => setActiveConversation(conv.id)}
            >
              <div className="flex px-4 py-4 sm:px-6">
                <div className="flex-shrink-0 relative">
                  <img className="h-10 w-10 rounded-full" src={conv.professional.image} alt="" />
                  {conv.professional.online && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400" />
                  )}
                </div>
                <div className="ml-3 flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900 truncate">{conv.professional.name}</p>
                    <p className="text-xs text-gray-500">{conv.lastMessage.time}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 truncate">{conv.lastMessage.text}</p>
                    {conv.lastMessage.unread && (
                      <span className="inline-flex items-center justify-center h-5 w-5 rounded-full bg-red-100 text-xs font-medium text-red-800">
                        1
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Conversation/Messages */}
      <div className="flex-1 flex flex-col">
        {activeConvo ? (
          <>
            {/* Conversation Header */}
            <div className="border-b border-gray-200 p-4 flex items-center justify-between">
              <div className="flex items-center">
                <div className="flex-shrink-0 relative">
                  <img className="h-10 w-10 rounded-full" src={activeConvo.professional.image} alt="" />
                  {activeConvo.professional.online && (
                    <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full ring-2 ring-white bg-green-400" />
                  )}
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{activeConvo.professional.name}</p>
                  <p className="text-xs text-gray-500">{activeConvo.professional.company}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <Phone className="h-5 w-5" />
                </button>
                <button className="p-2 rounded-full text-gray-400 hover:text-gray-500 hover:bg-gray-100">
                  <Video className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto">
              <div className="space-y-4">
                {activeConvo.messages.map((msg) => (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'homeowner' ? 'justify-end' : 'justify-start'}`}
                  >
                    {msg.sender === 'professional' && (
                      <img className="h-8 w-8 rounded-full mr-2" src={activeConvo.professional.image} alt="" />
                    )}
                    <div 
                      className={`rounded-lg px-4 py-2 max-w-xs lg:max-w-md ${
                        msg.sender === 'homeowner' 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      <p className="text-sm">{msg.text}</p>
                      <p className={`text-xs mt-1 ${msg.sender === 'homeowner' ? 'text-blue-200' : 'text-gray-500'}`}>
                        {msg.time}
                      </p>
                    </div>
                    {msg.sender === 'homeowner' && (
                      <img 
                        className="h-8 w-8 rounded-full ml-2" 
                        src={user?.profileImage || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"} 
                        alt="" 
                      />
                    )}
                  </div>
                ))}
                <div ref={messageEndRef} />
              </div>
            </div>

            {/* Message Input */}
            <div className="border-t border-gray-200 p-4">
              <div className="flex items-center">
                <button className="p-2 rounded-full text-gray-400 hover:text-gray-500">
                  <Paperclip className="h-5 w-5" />
                </button>
                <textarea
                  rows={1}
                  className="block w-full border-0 resize-none focus:ring-0 sm:text-sm"
                  placeholder="Type a message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-full h-8 w-8 bg-blue-600 hover:bg-blue-700"
                  onClick={handleSendMessage}
                >
                  <Send className="h-4 w-4 text-white" />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <MessageSquare className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
              <p className="mt-1 text-sm text-gray-500">
                Select a conversation from the list to start messaging.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;