import { createSlice, createAction } from '@reduxjs/toolkit';

import CartItem from '../../models/cart-item';
import { addOrder } from '../actions/orders';

import { deleteProduct } from '../actions/products';

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
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const selectedCartItem = state.items[productId];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        ).get();
        updatedCartItems = { ...state.items, [productId]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[productId];
      }
      return {
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice,
      };
    },
  },
  // Defined as extraReducer, so that it can be invoked through product reducer which has the same name action.
  extraReducers: (builder) => {
    builder.addCase(deleteProduct.fulfilled, (state, action) => {
      const {
        meta: { arg },
      } = action;
      if (!state.items[arg]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[arg].sum;
      delete updatedItems[arg];
      state.items = updatedItems;
      state.totalAmount = state.totalAmount - itemTotal;
    });
    builder.addCase(addOrder.fulfilled, (state) => {
      state.items = {};
      state.totalAmount = 0;
    });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
