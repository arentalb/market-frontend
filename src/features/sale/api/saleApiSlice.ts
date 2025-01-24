import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import {
  CreateSaleInvoicePayload,
  SaleInvoice,
} from "@/features/sale/types/sale.types.ts";

const saleSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSaleInvoice: builder.mutation<
      ApiResponse<{ invoice: SaleInvoice }>,
      CreateSaleInvoicePayload
    >({
      query: (data) => ({
        url: `sale`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
  }),
  overrideExisting: true,
});

export const { useCreateSaleInvoiceMutation } = saleSlice;
