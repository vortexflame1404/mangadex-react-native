import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import authReducers from './authSlices';
import errorsReducers from './errorsSlice';
import mangaReducer from './mangaSlice';
import chapterReducers from './chapterSlice';

export default configureStore({
  reducer: {
    auth: authReducers,
    errors: errorsReducers,
    manga: mangaReducer,
    chapter: chapterReducers,
  },
  middleware: [
    ...getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
  ],
});
