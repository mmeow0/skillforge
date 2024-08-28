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
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">SkillForge</Link>
        <div>
          {isLoggedIn ? (
            <>
              <Link to="/profile" className="mr-4">My Profile</Link>
              <Link to="/courses" className="mr-4">Courses</Link>
              <button onClick={handleLogout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="mr-4">Login</Link>
              <Link to="/register" className="bg-green-500 px-4 py-2 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};
