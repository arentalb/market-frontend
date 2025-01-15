import apiSlice from "../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { User } from "@/features/auth/auth.types.ts";
import { CreateUnitPayload, Unit } from "@/features/unit/unit.types.ts";
import { UnitTag } from "@/constants/tags.ts";

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
      ApiResponse<{ user: User }>,
      CreateUnitPayload
    >({
      query: (data) => ({
        url: `units`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [UnitTag],
    }),
  }),
  overrideExisting: true,
});

export const { useGetUnitsQuery, useCreateUnitMutation } = unitSlice;
