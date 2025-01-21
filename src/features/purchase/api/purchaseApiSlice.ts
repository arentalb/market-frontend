import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { PurchaseInvoiceTag } from "@/constants/tags.ts";
import { PurchaseInvoice } from "@/features/purchase/types/purchaseProduct.types.ts";
import { PurchaseInvoiceSchemaType } from "@/features/purchase/schemas/purchaseSchema.ts";

const purchaseInvoiceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPurchaseInvoice: builder.mutation<
      ApiResponse<{ invoice: PurchaseInvoice }>,
      PurchaseInvoiceSchemaType
    >({
      query: (data) => ({
        url: `purchase-invoice`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [PurchaseInvoiceTag],
    }),
  }),
  overrideExisting: true,
});

export const { useCreatePurchaseInvoiceMutation } = purchaseInvoiceSlice;
