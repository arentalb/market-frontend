import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";

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
        sortDir: string;
      }
    >({
      query: ({ page, size, firstName, phone, sortBy, sortDir }) => {
        let url = `/customers?page=${page}&size=${size}`;
        if (firstName) {
          url += `&filter=firstName:like:${firstName}`;
        }
        if (phone) {
          url += `&filter=phone:like:${phone}`;
        }
        if (sortDir && sortBy) {
          url += `&sort=${sortBy}:${sortDir}`;
        }
        return {
          url: url,
          method: "GET",
        };
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetCustomersQuery } = customerSlice;
