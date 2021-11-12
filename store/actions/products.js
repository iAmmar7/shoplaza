import { createAsyncThunk } from '@reduxjs/toolkit';

import Product from '../../models/product';
import { FIREBASE_URL } from '../../constants/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async (_, getState) => {
  const response = await fetch(`${FIREBASE_URL}/products.json`);

  if (!response.ok) throw new Error('Something went wrong!');

  const resData = await response.json();

  let loadedProducts = [];

  for (const key in resData) {
    loadedProducts.push(
      new Product(
        key,
        'u1',
        resData[key].title,
        resData[key].imageUrl,
        resData[key].description,
        resData[key].price
      ).get()
    );
  }
  return loadedProducts;
});

export const createProduct = createAsyncThunk('products/createProduct', async (data, store) => {
  const {
    auth: { token },
  } = store.getState();
  const response = await fetch(`${FIREBASE_URL}/products.json?auth=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Something went wrong!');

  return await response.json();
});

export const updateProduct = createAsyncThunk('products/updateProduct', async (data, store) => {
  const {
    auth: { token },
  } = store.getState();
  const { productId, title, description, imageUrl } = data;
  const response = await fetch(`${FIREBASE_URL}/products/${productId}.json?auth=${token}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      description,
      imageUrl,
    }),
  });

  if (!response.ok) throw new Error('Something went wrong!');

  return await response.json();
});

export const deleteProduct = createAsyncThunk('products/deleteProduct', async (productId, store) => {
  const {
    auth: { token },
  } = store.getState();
  const response = await fetch(`${FIREBASE_URL}/products/${productId}.json?auth=${token}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Something went wrong!');

  return await response.json();
});
