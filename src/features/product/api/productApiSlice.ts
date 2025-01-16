import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { ProductTag } from "@/constants/tags.ts";
import { Product } from "@/features/product/types/product.types.ts";
import { createProductSchemaType } from "@/features/product/forms/schema.ts";

const unitSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query<ApiResponse<{ products: Product[] }>, void>({
      query: () => ({
        url: `products`,
        method: "GET",
      }),
      providesTags: [ProductTag],
    }),
    createProduct: builder.mutation<
      ApiResponse<{ products: Product }>,
      createProductSchemaType
    >({
      query: (data) => ({
        url: `products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [ProductTag],
    }),
  }),
  overrideExisting: true,
});

export const { useGetProductsQuery, useCreateProductMutation } = unitSlice;
