import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";

import { SupplierTag } from "@/constants/tags.ts";
import {
  createSupplierSchemaType,
  updateSupplierSchemaType,
} from "@/features/company/schemas/supplierSchemas.ts";
import { Supplier } from "@/features/company/types/supplier.types.ts";
import { buildQueryString } from "@/lib/buildQueryString.ts";

const supplierSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSuppliers: builder.query<
      ApiResponse<{ suppliers: Supplier[] }>,
      {
        page: number;
        size: number;
      }
    >({
      query: ({ page, size }) => {
        const queryString = buildQueryString({
          page,
          size,
        });
        return {
          url: `/suppliers${queryString}`,
          method: "GET",
        };
      },
      providesTags: [SupplierTag],
    }),

    getSupplierById: builder.query<
      ApiResponse<{ supplier: Supplier }>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `suppliers/${id}`,
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
        url: `suppliers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [SupplierTag],
    }),

    updateSupplier: builder.mutation<
      ApiResponse<{ supplier: Supplier }>,
      { id: number; data: updateSupplierSchemaType }
    >({
      query: ({ id, data }) => ({
        url: `suppliers/${id}`,
        method: "PATCH",
        body: data,
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
