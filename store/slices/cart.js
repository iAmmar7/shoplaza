import { createSlice } from '@reduxjs/toolkit';

import CartItem from '../../models/cart-item';

const initialState = {
  items: {},
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { payload: { id, price, title } = {} } = action;
      let updatedOrNewCartItem;
      if (state.items[id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[id].quantity + 1,
          price,
          title,
          state.items[id].sum + price
        ).get();
      } else {
        updatedOrNewCartItem = new CartItem(1, price, title, price).get();
      }
      return {
        items: { ...state.items, [id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + price,
      };
    },
  },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
