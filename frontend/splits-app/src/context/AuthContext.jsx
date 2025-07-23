import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Create a utility to set the auth token for all axios requests
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
  } else {
    delete axios.defaults.headers.common['x-auth-token'];
  }
};

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Centralized function to load user data
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      try {
        const res = await axios.get('/api/auth');
        setUser(res.data);
      } catch (err) {
        console.error('Failed to load user', err);
        // If token is invalid, remove it
        localStorage.removeItem('token');
        setUser(null);
      }
    }
    setLoading(false);
  };

  // Load user on initial app render
  useEffect(() => {
    loadUser();
  }, []);

  // Function to handle user registration
  const register = async (username, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      // After getting the token, call loadUser to fetch data
      await loadUser(); 
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.msg || 'Registration failed. Please try again.';
      console.error('Registration error:', message);
      return { success: false, message };
    }
  };

  // Function to handle user login
  const login = async (email, password) => {
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      // After getting the token, call loadUser to fetch data
      await loadUser();
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.msg || 'Login failed. Please check your credentials.';
      console.error('Login error:', message);
      return { success: false, message };
    }
  };

  // Function to handle user logout
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  // The value provided to consuming components
  const value = {
    user,
    register,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;
