import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { logout } from '../../store/authSlice';

export const Navbar: React.FC = () => {
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav className="shadow-lg p-2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-900">SkillForge</Link>
        <div>
          {isLoggedIn ? (
            <>
              <Link
                to="/profile"
                className="mr-4 text-gray-700 hover:text-indigo-500 transition-colors duration-300"
              >
                My Profile
              </Link>
              <Link
                to="/courses"
                className="mr-4 text-gray-700 hover:text-indigo-500 transition-colors duration-300"
              >
                Courses
              </Link>
              <button
                onClick={handleLogout}
                className="bg-indigo-400 text-white px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors duration-300 shadow-md"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="mr-4 text-gray-700 hover:text-indigo-500 transition-colors duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className=" bg-indigo-500 text-white px-4 py-2 rounded-md hover:bg-indigo-600 transition-colors duration-300 shadow-md"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
