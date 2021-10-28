import { configureStore } from '@reduxjs/toolkit';

import productSlice from './slices/products';
import cartSlice from './slices/cart';
import orderSlice from './slices/orders';

const store = configureStore({
  reducer: {
    products: productSlice,
    cart: cartSlice,
    orders: orderSlice,
  },
});

export default store;
