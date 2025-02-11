// src/context/UserTypeContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

export type UserType = 'homeowner' | 'professional';

interface UserTypeContextProps {
  userType: UserType;
  setUserType: React.Dispatch<React.SetStateAction<UserType>>;
}

export const UserTypeContext = createContext<UserTypeContextProps | undefined>(undefined);

interface UserTypeProviderProps {
  children: ReactNode;
}

export const UserTypeProvider = ({ children }: UserTypeProviderProps) => {
  const [userType, setUserType] = useState<UserType>('homeowner');
  return (
    <UserTypeContext.Provider value={{ userType, setUserType }}>
      {children}
    </UserTypeContext.Provider>
  );
};
