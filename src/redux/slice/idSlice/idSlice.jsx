/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: [],
};

const idSlice = createSlice({
  name: "id",
  initialState,
  reducers: {
    getAllId(state, action) {
      state.id = [...state.id, ...action.payload];
    },
    filteredId(state, action) {
      state.id = [...action.payload];
    },
  },
});

export const { getAllId, filteredId } = idSlice.actions;

export default idSlice.reducer;
