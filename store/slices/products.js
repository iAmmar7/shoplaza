import { createSlice } from '@reduxjs/toolkit';

import PRODUCTS from '../../data/dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    deleteProduct: (state, action) => {
      return {
        userProducts: state.userProducts.filter((product) => product.id !== action.payload),
        availableProducts: state.availableProducts.filter((product) => product.id !== action.payload),
      };
    },
  },
});

export const { deleteProduct } = productSlice.actions;

export default productSlice.reducer;
