import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import styles from './Navbar.module.css';
import { FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const onLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <nav className="bg-gray-800 shadow-lg rounded-md">
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
          <div className="flex items-center space-x-4">
            <span className="text-gray-300 hidden sm:block">
              Welcome, {user ? user.username : 'Guest'}
            </span>
            {/* New Animated Logout Button */}
            <button onClick={onLogout} className={styles.btn}>
              <div className={styles.sign}>
                <FaSignOutAlt />
              </div>
              <div className={styles.text}>
                Logout
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
