import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Used to redirect the user after a successful login
  const navigate = useNavigate();
  const {login}=useContext(AuthContext);

  const { email, password } = formData;
  const [error,setError]=useState('');
  const [loading,setLoading]=useState(false);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result=await login(email,password);

    setLoading(false);
    if(result.success){
         navigate('/dashboard', { replace: true });
    }else{
        setError(result.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 font-sans p-4">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-xl shadow-2xl border border-gray-700 text-center relative">
        <div className="flex justify-center mb-8">
            <img src="/logo.png" alt="Splits Logo" className="h-16 rounded" />
        </div>

        <h1 className="text-4xl font-bold text-white mb-2">Sign In</h1>
        <p className="text-gray-400 mb-8">Log in to your Splits account</p>
        <form onSubmit={onSubmit} className="text-left">
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
            Sign In
          </button>
        </form>
        <p className="mt-8 text-gray-400">
          Don't have an account?{' '}
          <Link to="/register" className="font-medium text-blue-500 hover:text-blue-400 no-underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
