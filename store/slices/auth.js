import { createSlice } from '@reduxjs/toolkit';

import { signUp, login, refreshToken } from '../actions/auth';

const initialState = {
  loading: false,
  error: null,
  token: null,
  userId: null,
  autoLoginTried: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAutoLoginFailed(state) {
      state.autoLoginTried = true;
    },
    authenticate(state, action) {
      state.userId = action.payload.userId;
      state.token = action.payload.token;
      state.autoLoginTried = true;
    },
    logout(state) {
      state.token = null;
      state.userId = null;
      state.autoLoginTried = true;
    },
  },
  extraReducers: (builder) => {
    // SignUp
    builder.addCase(signUp.pending, (state) => {
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
      console.log('SignUp rejected: ', action);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to signup!';
    });

    // Login
    builder.addCase(login.pending, (state) => {
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

    // Refresh token
    builder.addCase(refreshToken.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(refreshToken.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.token = action.payload?.id_token;
      state.userId = action.payload?.user_id;
    });
    builder.addCase(refreshToken.rejected, (state, action) => {
      console.log('RefreshToken rejected: ', action);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to refetch the token!';
    });
  },
});

export const { setAutoLoginFailed, authenticate, logout } = authSlice.actions;

export { signUp, login, refreshToken };

export default authSlice.reducer;
