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
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      console.log('SignUp fulfilled: ', action);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      console.log('SignUp rejected: ', action);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to signup!';
    });

    // Login
    builder.addCase(login.pending, (state, action) => {
      console.log('Login pending: ', action);
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      console.log('Login fulfilled: ', action);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log('Login rejected: ', action);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to login!';
    });
  },
});

export default authSlice.reducer;
