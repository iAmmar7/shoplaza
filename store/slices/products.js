import { createSlice } from '@reduxjs/toolkit';

import Product from '../../models/product';
import PRODUCTS from '../../data/dummy-data';
import { fetchProducts, createProduct, deleteProduct, updateProduct } from '../actions/products';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
  loading: false,
  error: null,
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
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

    // Add Product
    builder.addCase(createProduct.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      const {
        meta: { arg: { title, description, imageUrl, price } = {} },
        payload: { name } = {},
      } = action;
      const newProduct = new Product(name, 'u1', title, imageUrl, description, price).get();
      state.availableProducts = [...state.availableProducts, newProduct];
      state.userProducts = [...state.userProducts, newProduct];
      state.loading = false;
      state.error = null;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      console.log('Create Product Error: ', action.error);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to add a product!';
    });

    // Update Product
    builder.addCase(updateProduct.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateProduct.fulfilled, (state, action) => {
      const {
        meta: { arg: { productId } = {} },
        payload: { title, imageUrl, description } = {},
      } = action;
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
      state.availableProducts = updatedAvailableProducts;
      state.userProducts = updatedUserProducts;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(updateProduct.rejected, (state, action) => {
      console.log('Update Product Error: ', action.error);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to add a product!';
    });

    // Delete Product
    builder.addCase(deleteProduct.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const {
        meta: { arg },
      } = action;
      state.userProducts = state.userProducts.filter((product) => product.id !== arg);
      state.availableProducts = state.availableProducts.filter((product) => product.id !== arg);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(deleteProduct.rejected, (state, action) => {
      console.log('Create Product Error: ', action.error);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to add a product!';
    });
  },
});

export { fetchProducts, createProduct, updateProduct, deleteProduct };

export default productSlice.reducer;
