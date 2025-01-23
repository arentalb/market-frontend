import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { PurchaseInvoiceTag } from "@/constants/tags.ts";

const purchaseInvoicePaymentSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    payPurchaseInvoice: builder.mutation<
      ApiResponse<{ payment: number }>,
      {
        invoiceId: number;
        amount: number;
      }
    >({
      query: (data) => ({
        url: `purchase/invoice/payment`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [PurchaseInvoiceTag],
    }),
  }),
  overrideExisting: true,
});

export const { usePayPurchaseInvoiceMutation } = purchaseInvoicePaymentSlice;
