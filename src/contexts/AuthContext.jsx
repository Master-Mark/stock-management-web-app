
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with backend session validation
    // e.g., fetch('/api/auth/session') to validate token with PHP backend
    const storedUser = localStorage.getItem('adminUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (emailOrUsername, password) => {
    // TODO: Replace with actual API call to PHP/MySQL backend
    // e.g., fetch('/api/auth/login', { method: 'POST', body: JSON.stringify({ emailOrUsername, password }) })
    
    // Simulated delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock validation
    if ((emailOrUsername === 'admin@v8parts.com' || emailOrUsername === 'admin') && password === 'admin123') {
      const mockUser = {
        id: 'ADM-001',
        name: 'Marcus Rodriguez',
        email: 'admin@v8parts.com',
        role: 'Super Administrator',
        permissions: ['all'], // TODO: Check user permissions from database
        avatar: null,
        lastLogin: new Date().toISOString()
      };
      setUser(mockUser);
      localStorage.setItem('adminUser', JSON.stringify(mockUser));
      return { success: true };
    } else {
      return { success: false, error: 'Invalid credentials' };
    }
  };

  const logout = () => {
    // TODO: Call backend to invalidate session token
    // e.g., fetch('/api/auth/logout', { method: 'POST' })
    setUser(null);
    localStorage.removeItem('adminUser');
    toast.info('You have been logged out securely.');
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
