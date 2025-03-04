import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, signup } from '../lib/api';
import { AuthResponse, UserCredentials } from '../types';
import { AppDispatch } from '.';



const initialState: AuthResponse = {
  token: localStorage.getItem('token') ?? "",
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.token = "";
      localStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export const loginUser = (credentials: { username: string; password: string }) => async (
  dispatch: AppDispatch
) => {
  const response = await login(credentials);
  dispatch(loginSuccess({ token: response.token }));
};

export const signupUser = (credentials: UserCredentials ) => async (
  dispatch: AppDispatch
) => {
  const response = await signup(credentials);
  dispatch(loginSuccess({ token: response.token}))
};

export default authSlice.reducer;