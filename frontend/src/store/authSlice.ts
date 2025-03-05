import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, signup } from '../lib/api';
import { AuthResponse, UserCredentials } from '../types';
import { AppDispatch } from '.';
import axios from 'axios';


const initialState: AuthResponse = {
  token: localStorage.getItem('token') ?? "",
  loading: false,
  error: null

};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<{ token: string }>) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
      state.loading = false
      state.error = null

    },
    logout: (state) => {
      state.token = "";
      localStorage.removeItem('token');
      state.loading = false
      state.error = null

    },
    setLoading: (state)=>{
      state.loading = true
      state.error = null
    },
    setError: (state, action: PayloadAction<string>)=>{
      state.loading= false
      state.error = action.payload
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const { loginSuccess, logout, setLoading, setError, clearError } = authSlice.actions;

export const loginUser = (credentials: { username: string; password: string }) => async (
  dispatch: AppDispatch
) => {
  dispatch(setLoading())
  try {
    const response = await login(credentials);
    dispatch(loginSuccess({ token: response.token }));
  } catch (error) {
    if (axios.isAxiosError(error)){
      dispatch(setError(error.response?.data.message))
    }else{
      dispatch(setError("Login failed. Please try again."))
    }

  }
};

export const signupUser = (credentials: UserCredentials ) => async (
  dispatch: AppDispatch
) => {
  dispatch(setLoading())
  try {
    const response = await signup(credentials);
    dispatch(loginSuccess({ token: response.token}))
  } catch (error) {
    if (axios.isAxiosError(error)){
      dispatch(setError(error.response?.data.message))
    }else{
      dispatch(setError('Signup failed. Please try again.'))
    }
  }
};

export default authSlice.reducer;