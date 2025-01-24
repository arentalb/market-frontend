import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";

const customerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<
      ApiResponse<{ customers: { firstName: string; id: number }[] }>,
      void
    >({
      query: () => ({
        url: `customers`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetCustomersQuery } = customerSlice;
