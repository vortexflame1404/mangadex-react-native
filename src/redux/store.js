import { configureStore } from '@reduxjs/toolkit';
import authReducers from './authSlices';

export default configureStore({
  reducer: {
    auth: authReducers,
  },
});
