import { configureStore } from "@reduxjs/toolkit";
import idReducer from "./slice/idSlice/idSlice";
import productsReducer from "./slice/productsSlice/productsSlice";
import brandsReducer from "./slice/brandsSlice/brandsSlice";

const store = configureStore({
  reducer: {
    idReducer,
    productsReducer,
    brandsReducer,
  },
});

export default store;
