import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import {
  CreateUnitPayload,
  Unit,
  UnitConversion,
} from "@/features/unit/types/unit.types.ts";
import { UnitConversionTag, UnitTag } from "@/constants/tags.ts";
import { createUnitConversionSchemaType } from "@/features/unit/forms/schemas.ts";

const unitSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUnits: builder.query<ApiResponse<{ units: Unit[] }>, void>({
      query: () => ({
        url: `units`,
        method: "GET",
      }),
      providesTags: [UnitTag],
    }),
    createUnit: builder.mutation<
      ApiResponse<{ unit: Unit }>,
      CreateUnitPayload
    >({
      query: (data) => ({
        url: `units`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [UnitTag],
    }),
    getUnitConversions: builder.query<
      ApiResponse<{ conversions: UnitConversion[] }>,
      void
    >({
      query: () => ({
        url: `conversions`,
        method: "GET",
      }),
      providesTags: [UnitConversionTag],
    }),

    createUnitConversion: builder.mutation<
      ApiResponse<{ conversion: UnitConversion }>,
      createUnitConversionSchemaType
    >({
      query: (data) => ({
        url: `conversions`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [UnitConversionTag],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetUnitsQuery,
  useCreateUnitMutation,
  useGetUnitConversionsQuery,
  useCreateUnitConversionMutation,
} = unitSlice;
