import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  CategoryTag,
  ProductTag,
  ProductUnitAvailable,
  UnitConversionTag,
  UnitTag,
  UserTag,
} from "@/constants/tags.ts";

const baseQuery = fetchBaseQuery({
  baseUrl: import.meta.env.VITE_BASE_URL || "",
  credentials: "include",
});

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQuery,
  tagTypes: [
    UserTag,
    ProductTag,
    UnitTag,
    UnitConversionTag,
    CategoryTag,
    ProductUnitAvailable,
  ],
  endpoints: () => ({}),
});

export default apiSlice;
