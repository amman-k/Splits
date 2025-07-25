import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // 1. Import useNavigate
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // 2. Initialize the navigate function

  const onLogout = () => {
    logout(); // This clears the user's token and state
    navigate('/login', { replace: true }); // 3. Navigate to the login page
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and App Name */}
          <div className="flex-shrink-0">
            <Link to="/dashboard" className="flex items-center space-x-3">
              <img src="/logo.png" alt="Splits Logo" className="h-8 w-auto" />
              <span className="text-white text-xl font-bold">Splits</span>
            </Link>
          </div>

          {/* User Info and Logout */}
          <div className="flex items-center">
            <span className="text-gray-300 mr-4">
              Welcome, {user ? user.username : 'Guest'}
            </span>
            <button
              onClick={onLogout}
              className="bg-red-600 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
