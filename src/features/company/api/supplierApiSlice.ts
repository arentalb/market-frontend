import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";

import { SupplierTag } from "@/constants/tags.ts";
import {
  createSupplierSchemaType,
  updateSupplierSchemaType,
} from "@/features/company/schemas/schema.ts";

interface Supplier {
  id: number;
  name: string;
  phone: string;
  workers: {
    id: number;
    name: string;
    phone: string;
  }[];
}
const supplierSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query<ApiResponse<{ supplier: Supplier[] }>, void>({
      query: () => ({
        url: `supplier`,
        method: "GET",
      }),
      providesTags: [SupplierTag],
    }),
    getSupplierById: builder.query<
      ApiResponse<{ supplier: Supplier }>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `supplier/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [
        { type: "Supplier", id: arg.id },
      ],
    }),

    createSupplier: builder.mutation<
      ApiResponse<{ supplier: Supplier }>,
      createSupplierSchemaType
    >({
      query: (data) => ({
        url: `supplier`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [SupplierTag],
    }),
    updateSupplier: builder.mutation<
      ApiResponse<{ supplier: Supplier }>,
      {
        data: updateSupplierSchemaType;
        id: number;
      }
    >({
      query: (data) => ({
        url: `supplier/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Supplier", id: arg.id },
        SupplierTag,
      ],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetSuppliersQuery,
  useGetSupplierByIdQuery,
  useCreateSupplierMutation,
  useUpdateSupplierMutation,
} = supplierSlice;
