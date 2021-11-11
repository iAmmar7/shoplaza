import { createAsyncThunk } from '@reduxjs/toolkit';

import { FIREBASE_AUTH_URL, FIREBASE_KEY } from '../../constants/api';

export const signUp = createAsyncThunk('auth/signUp', async ({ email, password }) => {
  const response = await fetch(`${FIREBASE_AUTH_URL}accounts:signUp?key=${FIREBASE_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
  });

  if (!response.ok) throw new Error('Something went wrong!');

  const resData = await response.json();

  console.log('resData', resData);

  return resData;
});

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const response = await fetch(`${FIREBASE_AUTH_URL}accounts:signInWithPassword?key=${FIREBASE_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
  });

  if (!response.ok) throw new Error('Something went wrong!');

  const resData = await response.json();

  console.log('resData', resData);

  return resData;
});
