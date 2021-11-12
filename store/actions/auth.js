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

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wrong!';
    if (errorId === 'EMAIL_EXISTS') {
      message = 'This email exists already!';
    }
    throw new Error(message);
  }

  const resData = await response.json();

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

  if (!response.ok) {
    const errorResData = await response.json();
    const errorId = errorResData.error.message;
    let message = 'Something went wrong!';
    if (errorId === 'EMAIL_NOT_FOUND') {
      message = 'This email could not be found!';
    } else if (errorId === 'INVALID_PASSWORD') {
      message = 'This password is not valid!';
    }
    throw new Error(message);
  }

  const resData = await response.json();

  return resData;
});
