// LoginPage.tsx

import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../store/authSlice';
import { setUserData } from '../../store/userSlice';
import { loginUser, getUserData } from '../../api/authApi';

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const data = await loginUser(email, password);
      dispatch(login(data.access_token)); // Сохраняем access токен в Redux
      localStorage.setItem('refreshToken', data.refresh_token); // Сохраняем refresh токен в localStorage

      // Получаем данные пользователя
      const userData = await getUserData();
      dispatch(setUserData(userData)); // Сохраняем данные пользователя в Redux

      const from = location.state?.from?.pathname || '/profile';
      navigate(from); // Редирект на запрашиваемую страницу
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      alert('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white border border-blue-500 rounded-lg shadow-md mt-16 mb-16">
        <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
        <p className="mt-2 text-center text-gray-600">Please enter your credentials to log in.</p>
        <form className="mt-6 space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input 
              type="email" 
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input 
              type="password" 
              className="w-full p-2 border border-gray-300 rounded mt-1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">Login</button>
        </form>
      </div>
    </div>
  );
};
