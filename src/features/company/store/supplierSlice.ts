import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store.ts";
import { useSelector } from "react-redux";

interface SupplierState {
  supplierId: number | null;
  supplierWorkerId: number | null;
}

const initialState: SupplierState = {
  supplierId: null,
  supplierWorkerId: null,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    setSupplierId: (state, action: PayloadAction<number>) => {
      state.supplierId = action.payload;
    },
    setSupplierWorkerId: (state, action: PayloadAction<number | null>) => {
      state.supplierWorkerId = action.payload;
    },
    resetSupplier: (state) => {
      state.supplierId = null;
      state.supplierWorkerId = null;
    },
  },
});

export const { setSupplierId, setSupplierWorkerId, resetSupplier } =
  supplierSlice.actions;

export const useSupplierId = (): number | null =>
  useSelector((state: RootState) => state.supplier.supplierId);

export const useSupplierWorkerId = (): number | null =>
  useSelector((state: RootState) => state.supplier.supplierWorkerId);

export default supplierSlice.reducer;
