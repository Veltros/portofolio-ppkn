'use client';
import { useState, useEffect } from 'react';

export function useAuth() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAdmin(true);
    }
    setIsLoaded(true);

    const handleStorageChange = () => {
      setIsAdmin(sessionStorage.getItem('admin_auth') === 'true');
    };
    
    // Listen to custom event for login/logout across components
    window.addEventListener('auth_change', handleStorageChange);
    return () => window.removeEventListener('auth_change', handleStorageChange);
  }, []);

  const login = (password) => {
    if (password === 'pkn123') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAdmin(true);
      window.dispatchEvent(new Event('auth_change'));
      return true;
    }
    return false;
  };

  const logout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAdmin(false);
    window.dispatchEvent(new Event('auth_change'));
  };

  return { isAdmin, isLoaded, login, logout };
}
