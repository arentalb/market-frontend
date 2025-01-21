import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import apiSlice from "./apiSlice.ts";
import authReducer from "../features/auth/store/authSlice.ts";
import productReducer from "@/features/product/stores/productSlice.ts";
import supplierReducer from "../features/company/store/supplierSlice.ts";
import purchaseReducer from "../features/purchase/stores/purchaseSlice.ts";

const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    supplier: supplierReducer,
    purchase: purchaseReducer,
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
