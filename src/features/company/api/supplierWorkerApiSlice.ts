import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";

import {
  createSupplierWorkerSchemaType,
  updateSupplierWorkerSchemaType,
} from "@/features/company/schemas/supplierWorkerSchemas.ts";

import { SupplierWorker } from "@/features/company/types/supplier.types.ts";
import { SupplierWorkerTag } from "@/constants/tags.ts";
import { buildQueryString } from "@/lib/buildQueryString.ts";

const supplierWorkerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupplierWorkers: builder.query<
      ApiResponse<{ workers: SupplierWorker[] }>,
      { supplierId: number; page: number; size: number }
    >({
      query: ({ supplierId, page, size }) => {
        const queryString = buildQueryString({
          page,
          size,
        });
        return {
          url: `/suppliers/${supplierId}/workers${queryString}`,
          method: "GET",
        };
      },
      providesTags: [SupplierWorkerTag],
    }),

    getSupplierWorkerById: builder.query<
      ApiResponse<{ worker: SupplierWorker }>,
      { supplierId: number; workerId: number }
    >({
      query: ({ supplierId, workerId }) => ({
        url: `suppliers/${supplierId}/workers/${workerId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [
        { type: "SupplierWorker", id: arg.workerId },
      ],
    }),

    createSupplierWorker: builder.mutation<
      ApiResponse<{ worker: SupplierWorker }>,
      { supplierId: number; data: createSupplierWorkerSchemaType }
    >({
      query: ({ supplierId, data }) => ({
        url: `suppliers/${supplierId}/workers`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [SupplierWorkerTag],
    }),

    updateSupplierWorker: builder.mutation<
      ApiResponse<{ worker: SupplierWorker }>,
      {
        supplierId: number;
        workerId: number;
        data: updateSupplierWorkerSchemaType;
      }
    >({
      query: ({ supplierId, workerId, data }) => ({
        url: `suppliers/${supplierId}/workers/${workerId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "SupplierWorker", id: arg.workerId },
        SupplierWorkerTag,
      ],
    }),

    deleteSupplierWorker: builder.mutation<
      ApiResponse<{ worker: SupplierWorker }>,
      { supplierId: number; workerId: number }
    >({
      query: ({ supplierId, workerId }) => ({
        url: `suppliers/${supplierId}/workers/${workerId}`,
        method: "DELETE",
      }),
      invalidatesTags: [SupplierWorkerTag],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetSupplierWorkersQuery,
  useGetSupplierWorkerByIdQuery,
  useCreateSupplierWorkerMutation,
  useUpdateSupplierWorkerMutation,
  useDeleteSupplierWorkerMutation,
} = supplierWorkerSlice;
