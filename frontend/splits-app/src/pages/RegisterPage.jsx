import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });

 
  const navigate = useNavigate();

  const { username, email, password } = formData;

 
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const onSubmit = async (e) => {
    e.preventDefault();
    console.log('Register form submitted', formData);
    // --- TODO: API call to /api/auth/register will go here ---
    // On success:
    // 1. Save the token to localStorage
    // 2. Navigate to the dashboard
    // navigate('/dashboard');
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 font-sans p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 text-center">
        
        <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="Splits Logo" className="h-16" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">Create Account</h1>
        <p className="text-gray-400 mb-8">Start splitting expenses with Splits</p>
        <form onSubmit={onSubmit} className="text-left">
          <div className="mb-5">
            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={onChange}
              required
              className="w-full p-3.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="e.g., John Doe"
            />
          </div>
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              required
              className="w-full p-3.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="you@example.com"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              minLength="6"
              required
              className="w-full p-3.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="w-full p-3.5 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 active:scale-[.98] transition-all"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-8 text-gray-400">
          Already have an account?{' '}
          <Link to="/login" className="font-medium text-blue-500 hover:text-blue-400 no-underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
