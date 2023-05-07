// @ts-nocheck
import {createSlice, createSelector} from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const newProduct = action.payload.product;
      const cartItem = state.items.find(
        item => item.product._id == newProduct._id,
      );
      if (cartItem) {
        cartItem.quantity += 1;
      } else {
        state.items.push({product: newProduct, quantity: 1});
      }
    },
    changeQuantity: (state, action) => {
      const {productId, amount} = action.payload;
      const cartItem = state.items.find(item => item.product._id == productId);
      if (cartItem) {
        cartItem.quantity += amount;
      }
      if (cartItem.quantity <= 0) {
        state.items = state.items.filter(item => item !== cartItem);
      }
    },
    clearCart: state => {
      state.items = [];
    },
  },
});

export const selectSubTotal = state =>
  state.cart.items.reduce(
    (sum, cartItem) =>
      sum + cartItem.product.discountedPrice * cartItem.quantity,
    0,
  );
