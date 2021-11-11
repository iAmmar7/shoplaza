import { createSlice } from '@reduxjs/toolkit';

import { signUp, login } from '../actions/auth';

const initialState = {
  loading: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // SignUp
    builder.addCase(signUp.pending, (state, action) => {
      console.log('SignUp pending: ', action);
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log('SignUp fulfilled: ', action);
    });
    builder.addCase(signUp.rejected, (state, action) => {
      console.log('SignUp rejected: ', action);
    });

    // Login
    builder.addCase(login.pending, (state, action) => {
      console.log('Login pending: ', action);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log('Login fulfilled: ', action);
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log('Login rejected: ', action);
    });
  },
});

export default authSlice.reducer;
