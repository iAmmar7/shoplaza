import { configureStore } from '@reduxjs/toolkit';

import productSlice from './slices/products';
import cartSlice from './slices/cart';

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
  },
});

export default store;
