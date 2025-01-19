import { createApi } from "@reduxjs/toolkit/query/react";
import {
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import {
  CategoryTag,
  ProductTag,
  ProductUnitAvailable,
  SupplierTag,
  UnitConversionTag,
  UnitTag,
  UserTag,
} from "@/constants/tags";

export interface ClientError {
  statusCode: number;
  message: string;
}

const rawBaseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL || "",
  credentials: "include",
});

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  ClientError
> = async (args, api, extraOptions) => {
  const result = await rawBaseQuery(args, api, extraOptions);

  if (result.error) {
    const errorObj = result.error as FetchBaseQueryError;

    if (typeof errorObj.status === "number") {
      const serverData = (errorObj.data ?? {}) as { message?: string };
      return {
        error: {
          statusCode: errorObj.status,
          message:
            serverData.message ||
            `Unknown server error (HTTP ${errorObj.status})`,
        },
      };
    } else {
      const fetchError = errorObj.error;
      return {
        error: {
          statusCode: 0,
          message: fetchError || "A network/parsing error occurred",
        },
      };
    }
  }

  return result;
};

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: customBaseQuery,
  tagTypes: [
    UserTag,
    ProductTag,
    UnitTag,
    UnitConversionTag,
    CategoryTag,
    ProductUnitAvailable,
    SupplierTag,
  ],
  endpoints: () => ({}),
});

export default apiSlice;
