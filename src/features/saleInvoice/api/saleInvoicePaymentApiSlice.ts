import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { SaleInvoiceTag } from "@/constants/tags.ts";

const saleInvoicePaymentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    paySaleInvoice: builder.mutation<
      ApiResponse<{ payment: number }>,
      {
        invoiceId: number;
        amount: number;
      }
    >({
      query: (data) => ({
        url: `sale/invoice/payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [SaleInvoiceTag],
    }),
  }),
  overrideExisting: true,
});

export const { usePaySaleInvoiceMutation } = saleInvoicePaymentSlice;
