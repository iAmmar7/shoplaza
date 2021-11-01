import { createAction, createAsyncThunk } from '@reduxjs/toolkit';

import Product from '../../models/product';
import { FIREBASE_URL } from '../../constants/api';

export const deleteProduct = createAction('deleteProduct');

export const createProduct = createAsyncThunk('products/createProduct', async (data) => {
  const res = await fetch(`${FIREBASE_URL}/products.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await res.json();
});

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
