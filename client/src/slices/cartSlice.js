import { createSlice } from "@reduxjs/toolkit";
import { updateCart } from "../utils/cartUtils";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {
      cartItems: [],
      shippingAddress: {
        address: "",
        city: "",
        postalCode: "",
        country: "",
      },
      paymentMethod: "PayPal",
    };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existItem = state.cartItems.find((x) => x._id === item._id);
      if (existItem) {
        state.cartItems = state.cartItems.map((x) =>
          x._id === item._id ? item : x
        );
      } else {
        state.cartItems = [...state.cartItems, item];
      }

      return updateCart(state);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter((x) => x._id !== itemId);

      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;

      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;

      return updateCart(state);
    },
    clearCartItems: (state) => {
      state.cartItems = [];

      return updateCart(state);
    },
    // eslint-disable-next-line no-unused-vars
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  saveShippingAddress,
  savePaymentMethod,
  removeFromCart,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
