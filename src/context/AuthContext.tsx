import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserRole } from '@/utils/constants';
import { demoUsers } from '@/utils/demoData';

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  aadhaar?: string;
  phone?: string;
  department?: string;
  designation?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (userData: Partial<User> & { password: string }) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored session
    const storedUser = localStorage.getItem('lrms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Demo authentication - find user by email
    const demoUser = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
    
    if (demoUser && password.length >= 4) {
      const authUser: User = {
        id: demoUser.id,
        name: demoUser.name,
        email: demoUser.email,
        role: demoUser.role as UserRole,
        aadhaar: 'aadhaar' in demoUser ? demoUser.aadhaar : undefined,
        phone: 'phone' in demoUser ? demoUser.phone : undefined,
        department: 'department' in demoUser ? demoUser.department : undefined,
        designation: 'designation' in demoUser ? demoUser.designation : undefined,
      };
      
      setUser(authUser);
      localStorage.setItem('lrms_user', JSON.stringify(authUser));
      setIsLoading(false);
      return { success: true };
    }
    
    setIsLoading(false);
    return { success: false, error: 'Invalid email or password' };
  };

  const register = async (userData: Partial<User> & { password: string }) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Check if email already exists
    const existingUser = demoUsers.find(u => u.email.toLowerCase() === userData.email?.toLowerCase());
    if (existingUser) {
      setIsLoading(false);
      return { success: false, error: 'Email already registered' };
    }
    
    // Create new user (in real app, this would be an API call)
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: (userData.role as UserRole) || 'citizen',
      aadhaar: userData.aadhaar,
      phone: userData.phone,
    };
    
    setUser(newUser);
    localStorage.setItem('lrms_user', JSON.stringify(newUser));
    setIsLoading(false);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('lrms_user');
  };

  const updateProfile = (data: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('lrms_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
