import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User } from '../../features/login/models/user.model';


interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Consider authenticated if we have a token or user
  // This is a minimal mock for now. In real apps, you'd decode JWT or call a /me endpoint
  const isAuthenticated = !!user || !!sessionStorage.getItem('jwt');

  useEffect(() => {
    // Attempt to load user from localStorage/sessionStorage if needed
    // Usually, you might have user data in storage along with the token.
    const token = sessionStorage.getItem('jwt');
    const storedUserStr = sessionStorage.getItem('user');
    if (token && storedUserStr) {
      try {
        const storedUser = JSON.parse(storedUserStr);
        setUser(storedUser);
      } catch (e) {
        console.error("Failed to parse user from storage", e);
      }
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    sessionStorage.setItem('jwt', userData.token);
    sessionStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem('jwt');
    sessionStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
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
