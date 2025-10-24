import { configureStore } from "@reduxjs/toolkit";
import analyticsReducer from "./analyticsSlice";
import userReducer from "./userSlice";
import cartReducer from "./cartSlice";
import productReducer from "./productSlice";

export const store = configureStore({
  reducer: {
    analytics: analyticsReducer,
    user: userReducer,
    cart: cartReducer,
    products: productReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;