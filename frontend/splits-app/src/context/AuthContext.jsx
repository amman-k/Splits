import React, { createContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common["x-auth-token"] = token;
  } else {
    delete axios.defaults.headers.common["x-auth-token"];
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        setAuthToken(token);
        try {
          const res = await axios.get("/api.auth");
          setUser(res.data);
        } catch (err) {
          console.error("Failed to load user", err);
          localStorage.removeItem("token");
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  const register = async (username, email, password) => {
    try {
      const res = axios.post("/api/auth/register", {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      setAuthToken(res.data.token);
      const userRes=await axios.get('/api/auth');

      setUser(userRes.data);
      return { sucess: true };
    } catch (err) {
      console.error("Registration error", err.message);
      return { success: fail, message: err.message };
    }
  };

  const login = async (email, password) => {
    try {
      const res = axios.post("/api/auth.login", { email, password });
      localStorage.setItem("token", res.data.token);
      setAuthToken(res.data.token);
      const userRes = await axios.get('/api/auth');
      setUser(userRes.data);
      return { success: true };
    } catch (err) {
      console.error("Login error", err.response.data);
      return {
        success: false,
        message: err.response.data.msg || "Login failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuthToken(null);
  };

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
