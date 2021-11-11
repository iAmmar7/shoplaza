import { configureStore } from '@reduxjs/toolkit';

import productSlice from './slices/products';
import cartSlice from './slices/cart';
import orderSlice from './slices/orders';
import authSlice from './slices/auth';

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    orders: orderSlice,
    auth: authSlice,
  },
  devTools: true,
});

export default store;
