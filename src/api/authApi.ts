import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

const instance = axios.create({
  baseURL: API_URL,
});

// Интерсептор для добавления токена в заголовки запросов
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерсептор для обработки ошибок и обновления токенов
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        if (refreshToken) {
          const response = await axios.post(`${API_URL}/auth/refresh/`, {
            refresh_token: refreshToken,
          });
          const { access_token, refresh_token } = response.data;

          localStorage.setItem("token", access_token);
          localStorage.setItem("refreshToken", refresh_token);

          instance.defaults.headers.Authorization = `Bearer ${access_token}`;
          originalRequest.headers.Authorization = `Bearer ${access_token}`;
          return instance(originalRequest);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (err) {
        localStorage.removeItem("token");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

// Регистрация пользователя
export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await instance.post("/auth/register/", {
    name,
    email,
    password,
  });
  return response.data;
};

// Вход пользователя
export const loginUser = async (email: string, password: string) => {
  const response = await instance.post("/auth/login/", { email, password });
  return response.data;
};

// Получение данных пользователя
export const getUserData = async () => {
  const response = await instance.get("/users/me/");
  return response.data;
};

// Получение защищённых данных (например, список курсов)
export const getCourses = async () => {
  const response = await instance.get("/courses/");
  return response.data;
};

// Добавление нового курса
export const addCourse = async (course: {
  title: string;
  description: string;
  category: string;
  instructor_name: string;
  instructor_image: string | null;
}) => {
  const response = await instance.post("/courses/", course);
  return response.data;
};

export const toggleSubscription = async (courseId: string) => {
  const response = await instance.post("/courses/subscribe/", {
    course_id: courseId,
  });
  return response.data;
};

export const deleteCourse = async (courseId: string) => {
  const response = await instance.delete(`/courses/${courseId}`);
  return response.data;
};
