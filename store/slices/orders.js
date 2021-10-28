import { createSlice } from '@reduxjs/toolkit';

import Order from '../../models/order';

const initialState = {
  orders: [],
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action) => {
      const { payload: { cartItems, totalAmount } = {} } = action;

      const newOrder = new Order(new Date().toString(), cartItems, totalAmount, new Date().toDateString()).get();
      state.orders = state.orders.concat(newOrder);
    },
  },
});

export const { addOrder } = orderSlice.actions;

export default orderSlice.reducer;
