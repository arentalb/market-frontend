import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { InventoryTag } from "@/constants/tags.ts";

export interface ProductUnit {
  unit: string;
  quantity: number;
}

export interface Inventory {
  id: number;
  name: string;
  quantityInUnits: ProductUnit[];
}
const inventorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInventory: builder.query<
      ApiResponse<{ inventory: Inventory[] }>,
      { name?: string }
    >({
      query: ({ name }) => {
        const queryObject: {
          url: string;
          method: string;
          params?: { name: string };
        } = {
          url: `inventory`,
          method: "GET",
        };

        if (name) {
          queryObject.params = { name };
        }

        return queryObject;
      },
      providesTags: [InventoryTag],
    }),
  }),

  overrideExisting: true,
});

export const { useGetInventoryQuery } = inventorySlice;
