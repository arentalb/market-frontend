import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import apiSlice from "./apiSlice.ts";
import authReducer from "../features/auth/store/authSlice.ts";
import productReducer from "../features/product/store/productSlice.ts";
import supplierReducer from "../features/company/store/supplierSlice.ts";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    supplier: supplierReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
