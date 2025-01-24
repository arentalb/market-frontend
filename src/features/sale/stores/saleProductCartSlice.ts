import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";
import {
  loadStateLocalStorage,
  saveStateLocalStorage,
} from "@/lib/localStorage";
import { SaleInvoiceProductInCart } from "@/features/sale/types/sale.types.ts";

const LOCAL_STORAGE_KEY = "sale";

const initialState: SaleInvoiceProductInCart[] =
  loadStateLocalStorage<SaleInvoiceProductInCart[]>(LOCAL_STORAGE_KEY) || [];

export const saleProductCartSlice = createSlice({
  name: "sale",
  initialState,
  reducers: {
    addSaleProductToCart: (
      state,
      action: PayloadAction<SaleInvoiceProductInCart>,
    ) => {
      const { product, unit, price } = action.payload;

      const existing = state.find(
        (item) => item.product.id === product.id && item.unit.id === unit.id,
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        state.push({
          product,
          unit,
          price,
          quantity: 1,
        });
      }

      saveStateLocalStorage(LOCAL_STORAGE_KEY, state);
    },

    removeSaleProductFromCart: (
      state,
      action: PayloadAction<{ productId: number; unitId: number }>,
    ) => {
      const newState = state.filter(
        (item) =>
          !(
            item.product.id === action.payload.productId &&
            item.unit.id === action.payload.unitId
          ),
      );

      state.length = 0;
      state.push(...newState);

      saveStateLocalStorage(LOCAL_STORAGE_KEY, state);
    },

    updateSaleProductFromCart: (
      state,
      action: PayloadAction<{
        productId: number;
        unitId: number;
        field: "quantity";
        value: number;
      }>,
    ) => {
      const { productId, field, value, unitId } = action.payload;

      const existingItem = state.find(
        (item) => item.product.id === productId && item.unit.id === unitId,
      );
      if (existingItem) {
        if (field === "quantity") {
          existingItem.quantity = value;
        }

        console.log(state);
        saveStateLocalStorage(LOCAL_STORAGE_KEY, state);
      }
    },

    removeAllSaleProductsInCart: (state) => {
      state.length = 0;
      saveStateLocalStorage(LOCAL_STORAGE_KEY, state);
    },
  },
});

export const {
  addSaleProductToCart,
  removeSaleProductFromCart,
  updateSaleProductFromCart,
  removeAllSaleProductsInCart,
} = saleProductCartSlice.actions;

export const getSaleProducts = (state: RootState) => state.sale;

export default saleProductCartSlice.reducer;
