import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface Course {
  title: string;
  description: string;
  category: string;
  is_subscribed: boolean; // Добавляем новое поле
}

interface UserState {
  name: string | null;
  email: string | null;
  courses: Course[];
}

const initialState: UserState = {
  name: null,
  email: null,
  courses: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<UserState>) => {
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.courses = action.payload.courses;
    },
    setCourses: (state, action: PayloadAction<Course[]>) => {
      state.courses = action.payload;
    },
    addCourse: (state, action: PayloadAction<Course>) => {
      state.courses.push(action.payload);
    },
  },
});

export const { setUserData, setCourses, addCourse } = userSlice.actions;

export default userSlice.reducer;
