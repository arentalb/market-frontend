import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import {
  loadStateLocalStorage,
  saveStateLocalStorage,
} from "@/lib/localStorage.ts";
import { PurchaseInvoiceProductInCart } from "@/features/purchase/types/purchaseProduct.types.ts";

const LOCAL_STORAGE_KEY = "purchase";

const initialState: PurchaseInvoiceProductInCart[] =
  loadStateLocalStorage<PurchaseInvoiceProductInCart[]>(LOCAL_STORAGE_KEY) ||
  [];

const purchaseProductCartSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    addPurchaseProductToCart: (
      state,
      action: PayloadAction<PurchaseInvoiceProductInCart>,
    ) => {
      const { product, unit } = action.payload;
      const existingProduct = state.find(
        (item) => item.product.id === product.id,
      );
      if (existingProduct) {
        existingProduct.unit = unit;
      } else {
        state.push(action.payload);
      }
      saveStateLocalStorage(LOCAL_STORAGE_KEY, state);
    },
    removePurchaseProductFromCart: (state, action: PayloadAction<number>) => {
      const newState = state.filter(
        (item) => item.product.id !== action.payload,
      );
      state.length = 0;
      state.push(...newState);
      saveStateLocalStorage(LOCAL_STORAGE_KEY, state);
    },
    updatePurchaseProductFromCart: (
      state,
      action: PayloadAction<{
        productId: number;
        field: "quantity" | "price";
        value: number;
      }>,
    ) => {
      const { productId, field, value } = action.payload;
      const existingProduct = state.find((p) => p.product.id === productId);
      if (existingProduct) {
        existingProduct[field] = value;
        saveStateLocalStorage(LOCAL_STORAGE_KEY, state);
      }
    },
    removeAllPurchaseProductsInCart: (state) => {
      state.length = 0;
      saveStateLocalStorage(LOCAL_STORAGE_KEY, state);
    },
  },
});

export const {
  addPurchaseProductToCart,
  removePurchaseProductFromCart,
  updatePurchaseProductFromCart,
  removeAllPurchaseProductsInCart,
} = purchaseProductCartSlice.actions;

export const selectPurchaseProducts = (state: RootState) => state.purchase;

export default purchaseProductCartSlice.reducer;
