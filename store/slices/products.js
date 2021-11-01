import { createSlice } from '@reduxjs/toolkit';

import Product from '../../models/product';
import PRODUCTS from '../../data/dummy-data';

import { createProduct, deleteProduct, updateProduct as updateProductAction } from '../actions/products';

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
      const { availableProducts, userProducts } = updateProductAction(state, action);
      state.availableProducts = availableProducts;
      state.userProducts = userProducts;
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
    builder.addCase(createProduct.rejected, (state, action) => {
      state.error = action;
    });
  },
});

export const { updateProduct } = productSlice.actions;

export { deleteProduct, createProduct };

export default productSlice.reducer;
