import { configureStore } from '@reduxjs/toolkit';
import authReducers from './authSlices';
import errorsReducers from './errorsSlice';

export default configureStore({
  reducer: {
    auth: authReducers,
    errors: errorsReducers,
  },
});
