import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { SaleInvoiceTag } from "@/constants/tags.ts";
import {
  SaleInvoice,
  SaleInvoiceDetail,
} from "@/features/saleInvoice/types/purchaseInvoice.types.ts";

const saleInvoiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSaleInvoices: builder.query<
      ApiResponse<{ invoices: SaleInvoice[] }>,
      void
    >({
      query: () => ({
        url: `sale/invoice`,
        method: "GET",
      }),
      providesTags: [SaleInvoiceTag],
    }),
    getSaleInvoiceById: builder.query<
      ApiResponse<{ invoice: SaleInvoiceDetail }>,
      { invoiceId: number }
    >({
      query: ({ invoiceId }) => ({
        url: `sale/invoice/${invoiceId}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [
        { type: SaleInvoiceTag, id: arg.invoiceId },
      ],
    }),
  }),
  overrideExisting: true,
});

export const { useGetSaleInvoicesQuery, useGetSaleInvoiceByIdQuery } =
  saleInvoiceSlice;
