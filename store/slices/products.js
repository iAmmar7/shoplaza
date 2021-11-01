import { createSlice, createAction, createAsyncThunk } from '@reduxjs/toolkit';

import Product from '../../models/product';
import PRODUCTS from '../../data/dummy-data';
import { FIREBASE_URL } from '../../constants/api';

const deleteProduct = createAction('deleteProduct');

const createProduct = createAsyncThunk('products/createProduct', (data) => {
  return fetch(`${FIREBASE_URL}/products.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => res.json());
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
    // createProduct: (state, action) => {
    //   const { title, description, imageUrl, price } = action.payload;
    //   const newProduct = new Product(new Date().toString(), 'u1', title, imageUrl, description, price).get();
    //   return {
    //     availableProducts: [...state.availableProducts, newProduct],
    //     userProducts: [...state.userProducts, newProduct],
    //   };
    // },
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
  extraReducers: {
    [deleteProduct]: (state, action) => {
      return {
        userProducts: state.userProducts.filter((product) => product.id !== action.payload),
        availableProducts: state.availableProducts.filter((product) => product.id !== action.payload),
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      const { meta: { arg: { title, description, imageUrl, price } = {}, payload: { name } = {} } = {} } = action;
      const newProduct = new Product(name, 'u1', title, imageUrl, description, price).get();
      return {
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
        loading: false,
      };
    });
  },
});

export const { updateProduct } = productSlice.actions;

export { deleteProduct, createProduct };

export default productSlice.reducer;
