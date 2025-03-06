import React, { createContext, useState, useContext, ReactNode } from 'react';

type UserType = 'homeowner' | 'professional' | null;

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: UserType;
  profileImage?: string;
}

interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const isAuthenticated = !!user;

  const login = async (email: string, password: string) => {
    // This would be replaced with actual API call
    // Simulating API response
    const mockUser: User = {
      id: '123',
      name: 'John Doe',
      email: email,
      phone: '+1234567890',
      type: email.includes('pro') ? 'professional' : 'homeowner',
      profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
    };
    
    setUser(mockUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, isAuthenticated, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};