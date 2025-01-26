import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { buildQueryString } from "@/lib/buildQueryString.ts";

export interface Customer {
  id: number;
  firstName: string;
  lastName: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
}

const customerSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCustomers: builder.query<
      ApiResponse<{ customers: Customer[] }>,
      {
        page: number;
        size: number;
        firstName: string;
        phone: string;
        sortBy: string;
        sortDir: "asc" | "desc";
      }
    >({
      query: ({ page, size, firstName, phone, sortBy, sortDir }) => {
        const queryString = buildQueryString({
          page,
          size,
          filters: {
            firstName: firstName || "",
            phone: phone || "",
          },
          sortBy,
          sortDir,
        });

        return {
          url: `/customers${queryString}`,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetCustomersQuery } = customerSlice;
