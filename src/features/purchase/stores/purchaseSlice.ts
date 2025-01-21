import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import {
  loadStateLocalStorage,
  saveStateLocalStorage,
} from "@/lib/localStorage.ts";
import { PurchasedProduct } from "@/features/purchase/types/purchaseProduct.types.ts";

const LOCAL_STORAGE_KEY = "purchase";

const initialState: PurchasedProduct[] =
  loadStateLocalStorage<PurchasedProduct[]>(LOCAL_STORAGE_KEY) || [];

const purchaseSlice = createSlice({
  name: "purchase",
  initialState,
  reducers: {
    addPurchaseProduct: (state, action: PayloadAction<PurchasedProduct>) => {
      const { product, unitId } = action.payload;
      const existingProduct = state.find(
        (item) => item.product.id === product.id,
      );
      if (existingProduct) {
        existingProduct.unitId = unitId;
      } else {
        state.push(action.payload);
      }
      saveStateLocalStorage(LOCAL_STORAGE_KEY, state);
    },
    removePurchaseProduct: (state, action: PayloadAction<number>) => {
      const newState = state.filter(
        (item) => item.product.id !== action.payload,
      );
      state.length = 0;
      state.push(...newState);
      saveStateLocalStorage(LOCAL_STORAGE_KEY, state);
    },
    updatePurchaseProduct: (
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
    resetPurchaseProducts: (state) => {
      state.length = 0;
      saveStateLocalStorage(LOCAL_STORAGE_KEY, state);
    },
  },
});

export const {
  addPurchaseProduct,
  removePurchaseProduct,
  updatePurchaseProduct,
  resetPurchaseProducts,
} = purchaseSlice.actions;

export const selectPurchaseProducts = (state: RootState) => state.purchase;

export default purchaseSlice.reducer;
