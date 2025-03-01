import { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged, User } from 'firebase/auth';
import { AdminCredentials } from '../types/Book';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setIsAuthenticated(!!currentUser);
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  const login = async (credentials: AdminCredentials) => {
    try {
      // For compatibility with your existing system, we'll use the username as email
      // In a real app, you might want to properly migrate users
      const email = `${credentials.username}@bookbuddy.app`;
      await signInWithEmailAndPassword(auth, email, credentials.password);
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return { user, isAuthenticated, login, logout, loading };
}
