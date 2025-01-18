import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { ProductUnitAvailable } from "@/constants/tags.ts";
import { Unit } from "@/features/unit/types/unit.types.ts";

const unitSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductUnitsDetail: builder.query<
      ApiResponse<{
        productBaseUnit: Unit;
        currentProductUnits: Unit[];
        addableUnits: Unit[];
      }>,
      { productId: number }
    >({
      query: (data) => ({
        url: `products/${data.productId}/units`,
        method: "GET",
      }),
      providesTags: [ProductUnitAvailable],
    }),
    setUnitToProduct: builder.mutation<
      void,
      { unitIds: number[]; productId: number }
    >({
      query: ({ productId, unitIds }) => ({
        url: `products/${productId}/units`,
        method: "POST",
        body: { unitIds },
      }),
      invalidatesTags: [ProductUnitAvailable],
    }),
  }),
  overrideExisting: true,
});

export const { useGetProductUnitsDetailQuery, useSetUnitToProductMutation } =
  unitSlice;
