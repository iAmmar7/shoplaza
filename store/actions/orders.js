import { createAsyncThunk } from '@reduxjs/toolkit';

import Order from '../../models/order';
import { FIREBASE_URL } from '../../constants/api';

export const addOrder = createAsyncThunk('orders/addOrder', async ({ cartItems, totalAmount }, store) => {
  const {
    auth: { token },
  } = store.getState();
  const date = new Date();
  const response = await fetch(`${FIREBASE_URL}/orders/u1.json?auth=${token}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cartItems,
      totalAmount,
      date: date.toISOString(),
    }),
  });

  if (!response.ok) throw new Error('Something went wrong!');

  const resData = await response.json();

  const newOrder = new Order(resData.name, cartItems, totalAmount, JSON.stringify(date)).get();

  return newOrder;
});

export const fetchOrders = createAsyncThunk('orders/fetchOrders', async () => {
  const response = await fetch(`${FIREBASE_URL}/orders/u1.json`);

  if (!response.ok) throw new Error('Something went wrong!');

  const resData = await response.json();
  const loadedOrders = [];

  for (const key in resData) {
    const order = new Order(
      key,
      resData[key].cartItems,
      resData[key].totalAmount,
      JSON.stringify(resData[key].date)
    ).get();
    loadedOrders.push(order);
  }

  return loadedOrders;
});
