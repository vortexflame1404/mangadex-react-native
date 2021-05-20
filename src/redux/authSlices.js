import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postLogin, postLogout, postRefreshToken } from '../api/mangadex';
import { clearToken, getRefreshToken, setToken } from '../services/storage';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: false,
  statusText: null,
  errorMessage: null,
};

export const login = createAsyncThunk(
  'auth/login',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await postLogin(username, password);
      if (response.status === 200) {
        const { token } = response.data;
        await setToken(token);
        return response.status;
      }
      return response.status;
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        const { status, statusText } = error.response;
        return rejectWithValue(status + ' ' + statusText);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        return rejectWithValue('Internal error');
      }
    }
  },
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      const response = await postLogout();
      if (response.status !== 200) {
        return rejectWithValue("Can't logout");
      }
      await clearToken();
      return response.data.result;
    } catch (e) {
      console.log('in logout async');
      if (e.response) {
        const { status, statusText } = e.response.data;
        return rejectWithValue(status + ' ' + statusText);
      } else if (e.request) {
        console.log(e.request);
        return rejectWithValue('Error in request');
      } else {
        console.log(e);
        return rejectWithValue('Internal error');
      }
    }
  },
);

export const authWhenLaunch = createAsyncThunk(
  'auth/authWhenLaunch',
  async (_, { rejectWithValue }) => {
    try {
      const oldRefresh = await getRefreshToken();
      if (!oldRefresh) {
        return rejectWithValue('No stored refresh token');
      }
      const response = await postRefreshToken(oldRefresh);
      const { token } = response.data;
      await setToken(token);
      return response;
    } catch (e) {
      console.log('error auth when launch');
      if (e.response) {
        const { status, statusText } = e.response;
        console.log(e.response);
        return rejectWithValue(status + ' ' + statusText);
      } else if (e.request) {
        console.log(e.request);
        return rejectWithValue('Error in request');
      } else {
        console.log(e.message);
        return rejectWithValue('Internal error');
      }
    }
  },
);

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectIsAuthenticating = (state) => state.auth.isAuthenticating;
export const selectAuthStatusText = (state) => state.auth.statusText;
export const selectAuthError = (state) => state.auth.errorMessage;

const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [login.pending]: (state, _) => {
      state.isAuthenticating = true;
    },
    [login.fulfilled]: (state, _) => {
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.statusText = 'Log in successfully!';
    },
    [login.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.statusText = null;
      state.errorMessage = payload;
    },
    [authWhenLaunch.pending]: (state, _) => {
      state.isAuthenticated = false;
      state.isAuthenticating = true;
    },
    [authWhenLaunch.fulfilled]: (state, action) => {
      state.isAuthenticated = true;
      state.isAuthenticating = false;
      state.errorMessage = null;
    },
    [authWhenLaunch.rejected]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.isAuthenticating = false;
      state.errorMessage = payload;
      state.statusText = null;
    },
    [logout.fulfilled]: (state, { payload }) => {
      state.isAuthenticated = false;
      state.statusText = payload;
      state.errorMessage = null;
    },
    [logout.rejected]: (state, { payload }) => {
      state.errorMessage = payload;
      state.statusText = null;
    },
  },
});

export default authSlice.reducer;
