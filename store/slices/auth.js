import { createSlice } from '@reduxjs/toolkit';

import { signUp, login } from '../actions/auth';

const initialState = {
  loading: false,
  error: null,
  token: null,
  userId: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // SignUp
    builder.addCase(signUp.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload?.idToken;
      state.userId = action.payload?.localId;
    });
    builder.addCase(signUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to signup!';
    });

    // Login
    builder.addCase(login.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload?.idToken;
      state.userId = action.payload?.localId;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log('Login rejected: ', action);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to login!';
    });
  },
});

export default authSlice.reducer;
