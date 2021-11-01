import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

import Product from '../../models/product';
import PRODUCTS from '../../data/dummy-data';
import { FIREBASE_URL } from '../../constants/api';

const deleteProduct = createAction('deleteProduct');

const createProduct = createAsyncThunk('products/createProduct', async (data) => {
  const res = await fetch(`${FIREBASE_URL}/products.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  return await res.json();
});

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    updateProduct: (state, action) => {
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
    },
  },
  extraReducers: (builder) => {
    builder.addCase(deleteProduct, (state, action) => {
      state.userProducts = state.userProducts.filter((product) => product.id !== action.payload);
      state.availableProducts = state.availableProducts.filter((product) => product.id !== action.payload);
    });
    builder.addCase(createProduct.pending, (state, _action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      const { meta: { arg: { title, description, imageUrl, price } = {}, payload: { name } = {} } = {} } = action;
      const newProduct = new Product(name, 'u1', title, imageUrl, description, price).get();
      state.availableProducts = [...state.availableProducts, newProduct];
      state.userProducts = [...state.userProducts, newProduct];
      state.loading = false;
    });
  },
});

export const { updateProduct } = productSlice.actions;

export { deleteProduct, createProduct };

export default productSlice.reducer;
