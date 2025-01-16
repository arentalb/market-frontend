import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { CategoryTag } from "@/constants/tags.ts";
import {
  Category,
  CreateCategoryPayload,
} from "@/features/category/types/category.types.ts";

const categorySlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCategories: builder.query<ApiResponse<{ categories: Category[] }>, void>(
      {
        query: () => ({
          url: `categories`,
          method: "GET",
        }),
        providesTags: [CategoryTag],
      },
    ),
    createCategory: builder.mutation<
      ApiResponse<{ category: Category }>,
      CreateCategoryPayload
    >({
      query: (data) => ({
        url: `categories`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [CategoryTag],
    }),
  }),
  overrideExisting: true,
});

export const { useGetCategoriesQuery, useCreateCategoryMutation } =
  categorySlice;
