import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { PurchaseInvoiceTag } from "@/constants/tags.ts";
import { PurchaseSchemaType } from "@/features/purchase/schemas/purchaseSchema.ts";
import {
  Invoice,
  InvoiceDetail,
} from "@/features/invoice/types/purchaseInvoice.types.ts";

const purchaseInvoiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPurchaseInvoices: builder.query<
      ApiResponse<{ invoices: Invoice[] }>,
      void
    >({
      query: () => ({
        url: `purchase/invoice`,
        method: "GET",
      }),
      providesTags: [PurchaseInvoiceTag],
    }),

    getPurchaseInvoiceById: builder.query<
      ApiResponse<{ invoice: InvoiceDetail }>,
      { invoiceId: number }
    >({
      query: ({ invoiceId }) => ({
        url: `purchase/invoice/${invoiceId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [
        { type: PurchaseInvoiceTag, id: arg.invoiceId },
      ],
    }),

    updatePurchaseInvoice: builder.mutation<
      ApiResponse<{ invoice: Invoice }>,
      {
        invoiceId: number;
        data: PurchaseSchemaType;
      }
    >({
      query: ({ invoiceId, data }) => ({
        url: `purchase/invoice/${invoiceId}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: PurchaseInvoiceTag, id: arg.invoiceId },
        PurchaseInvoiceTag,
      ],
    }),

    deletePurchaseInvoice: builder.mutation<
      ApiResponse<{ invoice: Invoice }>,
      { invoiceId: number }
    >({
      query: ({ invoiceId }) => ({
        url: `purchase/invoice/${invoiceId}`,
        method: "DELETE",
      }),
      invalidatesTags: [PurchaseInvoiceTag],
    }),
  }),
  overrideExisting: true,
});

export const {
  useDeletePurchaseInvoiceMutation,
  useGetPurchaseInvoiceByIdQuery,
  useGetPurchaseInvoicesQuery,
  useUpdatePurchaseInvoiceMutation,
} = purchaseInvoiceSlice;
