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

// The main provider component.
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Centralized function to load user data
  const loadUser = async () => {
    try {
      const res = await axios.get('/api/auth');
      setUser(res.data);
    } catch (err) {
      console.error('Failed to load user', err);
      localStorage.removeItem('token');
      setAuthToken(null);
      setUser(null);
    } finally {
      if (loading) {
        setLoading(false);
      }
    }
  };
  
  // Load user on initial app render if a token is present
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  // Function to handle user registration
  const register = async (username, email, password) => {
    try {
      const res = await axios.post('/api/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      setAuthToken(res.data.token);
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
      setAuthToken(res.data.token);
      await loadUser();
      return { success: true };
    } catch (err) {
      const message = err.response?.data?.msg || 'Login failed. Please check your credentials.';
      console.error('Login error:', message);
      return { success: false, message };
    }
  };

  // Function to handle user logout - it now only handles state
  const logout = () => {
    localStorage.removeItem('token');
    setAuthToken(null);
    setUser(null);
  };

  const value = { user, register, login, logout, loading };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContext;
