import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { postLogin, setCookieApi } from '../api/mangadex';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
  errorMessage: null,
};

export const checkAuth = createAsyncThunk('auth/checkAuth', async () => {
  const jsonCookie = await AsyncStorage.getItem('cookie');
  if (!jsonCookie) {
    throw new Error('Enter credentials');
  }
  const cookie = JSON.parse(jsonCookie);
  setCookieApi(cookie);

  return cookie;
});

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password, remember_me }) => {
    const response = await postLogin(username, password, remember_me);
    if (response.data) {
      throw new Error('Incorrect username or password');
    }
    if (remember_me) {
      const cookieTemp = JSON.stringify(response.headers['set-cookie']);
      await AsyncStorage.setItem('cookie', cookieTemp);
    }
    return response.status;
  },
);

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAuthenticating = (state) => state.auth.isAuthenticating;
export const selectAuthStatusText = (state) => state.auth.statusText;
export const selectAuthError = (state) => state.auth.errorMessage;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  extraReducers: {
    [login.pending]: (state, action) => {
      state.isAuthenticating = true;
      state.statusText = null;
    },
    [login.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.statusText = 'Log in successfully!';
      console.log('type of ', typeof action.payload);
    },
    [login.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.errorMessage = action.error.message;
    },
    [checkAuth.pending]: (state, action) => {
      state.isAuthenticated = false;
      state.isAuthenticating = true;
    },
    [checkAuth.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.statusText = 'Log in successfully!';
    },
    [checkAuth.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.errorMessage = action.error.message;
    },
  },
});

export default authSlice.reducer;
