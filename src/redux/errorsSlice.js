import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  code: null,
  message: null,
};

const errorsSlice = createSlice({
  name: 'error',
  initialState: initialState,
  reducers: {
    setError(state, action) {
      const { code, message } = action.payload;
      state.code = code;
      state.message = message;
    },
    unsetError(state) {
      state.code = null;
      state.message = null;
    },
  },
});

export const { setError, unsetError } = errorsSlice.actions;

export default errorsSlice.reducer;
