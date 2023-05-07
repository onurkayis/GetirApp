import {configureStore} from '@reduxjs/toolkit';

import {cartSlice} from './cartSlice';

export default store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});
