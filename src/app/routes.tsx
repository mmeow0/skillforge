import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CoursesPage } from "../pages/CoursesPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { UserProfilePage } from "../pages/UserProfilePage";
import { PrivateRoute } from "../shared/ui/PrivateRoute";
import { login } from "../store/authSlice";
import { Navbar } from "../shared/ui/Navbar";
import { getUserData } from "../api/authApi";
import { setUserData } from "../store/userSlice";

export const AppRoutes: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        dispatch(login(token)); // Устанавливаем состояние авторизации в Redux
        try {
          const userData = await getUserData();
          dispatch(setUserData(userData)); // Получаем и сохраняем данные пользователя в Redux
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          localStorage.removeItem("token");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login";
        }
      }
    };

    initializeAuth();
  }, [dispatch]);

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route
          path="/profile"
          element={<PrivateRoute element={<UserProfilePage />} />}
        />
        <Route
          path="/courses"
          element={<PrivateRoute element={<CoursesPage />} />}
        />
        <Route path="/" element={<PrivateRoute element={<HomePage />} />} />
      </Routes>
    </Router>
  );
};
