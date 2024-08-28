import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  isLoggedIn: boolean;
  token: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  token: null,
};

// Проверка на наличие токена в localStorage при инициализации состояния
const token = localStorage.getItem('token');
if (token) {
  initialState.isLoggedIn = true;
  initialState.token = token;
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.isLoggedIn = true;
      state.token = action.payload;
      localStorage.setItem('token', action.payload); // Сохраняем токен в localStorage
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.token = null;
      localStorage.removeItem('token'); // Удаляем токен из localStorage
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
