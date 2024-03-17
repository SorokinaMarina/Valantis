/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    getProductsData(state, action) {
      state.products = [...action.payload];
    },
  },
});

export const { getProductsData } = productsSlice.actions;

export default productsSlice.reducer;
