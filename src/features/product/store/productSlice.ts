import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store.ts";
import { useSelector } from "react-redux";

interface ProductState {
  productId: number | null;
  productUnitId: number | null;
}

const initialState: ProductState = {
  productId: null,
  productUnitId: null,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProductId: (state, action: PayloadAction<number>) => {
      state.productId = action.payload;
    },
    setProductUnitId: (state, action: PayloadAction<number | null>) => {
      state.productUnitId = action.payload;
    },
    resetProduct: (state) => {
      state.productId = null;
      state.productUnitId = null;
    },
  },
});

export const { setProductId, setProductUnitId, resetProduct } =
  productSlice.actions;

export const useProductId = (): number | null =>
  useSelector((state: RootState) => state.product.productId);

export const useProductUnitId = (): number | null =>
  useSelector((state: RootState) => state.product.productUnitId);
export default productSlice.reducer;
