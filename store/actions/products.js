import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import Product from '../../models/product';
import { FIREBASE_URL } from '../../constants/api';

export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
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

export const createProduct = createAsyncThunk('products/createProduct', async (data) => {
  const response = await fetch(`${FIREBASE_URL}/products.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) throw new Error('Something went wrong!');

  return await response.json();
});

export const deleteProduct = createAction('deleteProduct');

export const updateProduct = (state, action) => {
  const { productId, title, description, imageUrl } = action.payload;
  const productIndex = state.userProducts.findIndex((prod) => prod.id === productId);
  const updatedProduct = new Product(
    productId,
    state.userProducts[productIndex].ownerId,
    title,
    imageUrl,
    description,
    state.userProducts[productIndex].price
  ).get();
  const updatedUserProducts = [...state.userProducts];
  updatedUserProducts[productIndex] = updatedProduct;
  const availableProductIndex = state.availableProducts.findIndex((prod) => prod.id === productId);
  const updatedAvailableProducts = [...state.availableProducts];
  updatedAvailableProducts[availableProductIndex] = updatedProduct;
  return {
    availableProducts: updatedAvailableProducts,
    userProducts: updatedUserProducts,
  };
};
