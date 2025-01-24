import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { InventoryTag, PurchaseInvoiceTag } from "@/constants/tags.ts";
import {
  CreatePurchaseInvoicePayload,
  PurchaseInvoice,
} from "@/features/purchase/types/purchaseProduct.types.ts";

const purchaseSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createPurchase: builder.mutation<
      ApiResponse<{ invoice: PurchaseInvoice }>,
      CreatePurchaseInvoicePayload
    >({
      query: (data) => ({
        url: `purchase`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [PurchaseInvoiceTag, InventoryTag],
    }),
  }),
  overrideExisting: true,
});

export const { useCreatePurchaseMutation } = purchaseSlice;
