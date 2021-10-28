import { createSlice, createAction } from '@reduxjs/toolkit';

const deleteProduct = createAction('deleteProduct');

import PRODUCTS from '../../data/dummy-data';

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === 'u1'),
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  extraReducers: {
    [deleteProduct]: (state, action) => {
      return {
        userProducts: state.userProducts.filter((product) => product.id !== action.payload),
        availableProducts: state.availableProducts.filter((product) => product.id !== action.payload),
      };
    },
  },
});

export { deleteProduct };

export default productSlice.reducer;
