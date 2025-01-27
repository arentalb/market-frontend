import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { Unit, UnitConversion } from "@/features/unit/types/unit.types.ts";
import { UnitConversionTag, UnitTag } from "@/constants/tags.ts";
import { createUnitSchemaType } from "@/features/unit/schemas/unitSchemas.ts";
import { createUnitConversionSchemaType } from "@/features/unit/schemas/unitConversionSchema.ts";
import { buildQueryString } from "@/lib/buildQueryString.ts";

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
      createUnitSchemaType
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
      {
        page: number;
        size: number;
      }
    >({
      query: ({ page, size }) => {
        const queryString = buildQueryString({
          page,
          size,
        });
        return {
          url: `/conversions${queryString}`,
          method: "GET",
        };
      },
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
