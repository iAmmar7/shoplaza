import { createSlice } from '@reduxjs/toolkit';

import { addOrder, fetchOrders } from '../actions/orders';

const initialState = {
  loading: false,
  error: null,
  orders: [],
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add Order
    builder.addCase(addOrder.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(addOrder.fulfilled, (state, action) => {
      const { payload } = action;
      state.orders = state.orders.concat(payload);
      state.loading = false;
      state.error = null;
    });
    builder.addCase(addOrder.rejected, (state, action) => {
      console.log('Add Order Error: ', action);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to add a product!';
    });

    // Fetch Orders
    builder.addCase(fetchOrders.pending, (state, _action) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      const { payload } = action;
      state.orders = payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      console.log('Add Order Error: ', action);
      state.loading = false;
      state.error = action.error?.message ?? 'Unable to add a product!';
    });
  },
});

export { addOrder, fetchOrders };

export default orderSlice.reducer;
