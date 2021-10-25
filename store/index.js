import { configureStore } from '@reduxjs/toolkit';

import productSlice from './slices/products';

const store = configureStore({
  reducer: {
    products: productSlice,
  },
});

export default store;
