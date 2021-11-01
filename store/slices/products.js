import { createSlice } from '@reduxjs/toolkit';

import Product from '../../models/product';
import PRODUCTS from '../../data/dummy-data';

import { fetchProducts, createProduct, deleteProduct, updateProduct as updateProductAction } from '../actions/products';

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
    // Delete Product
    builder.addCase(deleteProduct, (state, action) => {
      state.userProducts = state.userProducts.filter((product) => product.id !== action.payload);
      state.availableProducts = state.availableProducts.filter((product) => product.id !== action.payload);
    });

    // Create Product
    builder.addCase(createProduct.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      const { meta: { arg: { title, description, imageUrl, price } = {}, payload: { name } = {} } = {} } = action;
      const newProduct = new Product(name, 'u1', title, imageUrl, description, price).get();
      state.availableProducts = [...state.availableProducts, newProduct];
      state.userProducts = [...state.userProducts, newProduct];
      state.loading = false;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      console.log('Create Product Error: ', action.error);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to add a product!';
    });

    // Fetch Products
    builder.addCase(fetchProducts.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.availableProducts = action.payload;
      state.userProducts = action.payload.filter((prod) => prod.ownerId === 'u1');
      state.loading = false;
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      console.log('Fetch Products Error: ', action.error);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to fetch the products!';
    });
  },
});

export const { updateProduct } = productSlice.actions;

export { deleteProduct, createProduct, fetchProducts };

export default productSlice.reducer;
