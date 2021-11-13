import { createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { FIREBASE_AUTH_URL, FIREBASE_KEY } from '../../constants/api';

const saveDataToStorage = (token, refreshToken, userId, expirationDate) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      refreshToken,
      userId,
      expiryDate: expirationDate.toISOString(),
    })
  );
};

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

  const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
  saveDataToStorage(resData.idToken, resData.refreshToken, resData.localId, expirationDate);

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

  const expirationDate = new Date(new Date().getTime() + parseInt(resData.expiresIn) * 1000);
  saveDataToStorage(resData.idToken, resData.refreshToken, resData.localId, expirationDate);

  return resData;
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (token) => {
  const response = await fetch(`${FIREBASE_AUTH_URL}token?key=${FIREBASE_KEY}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      grant_type: 'refresh_token',
      refresh_token: token,
    }),
  });

  if (!response.ok) throw new Error('Unable to fetch the token');

  const resData = await response.json();

  const expirationDate = new Date(new Date().getTime() + parseInt(resData.expires_in) * 1000);
  saveDataToStorage(resData.id_token, resData.refresh_token, resData.user_id, expirationDate);

  return resData;
});
