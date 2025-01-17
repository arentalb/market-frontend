import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { ProductTag } from "@/constants/tags.ts";
import {
  Product,
  ProductDetail,
} from "@/features/product/types/product.types.ts";
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
    getProductById: builder.query<
      ApiResponse<{ product: ProductDetail }>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `products/${id}`,
        method: "GET",
      }),

      providesTags: (_result, _error, arg) => [{ type: "Product", id: arg.id }],
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
    setUnitToProduct: builder.mutation<
      void,
      { unitIds: number[]; productId: number }
    >({
      query: ({ productId, unitIds }) => ({
        url: `products/${productId}/units`,
        method: "POST",
        body: unitIds,
      }),
      invalidatesTags: [ProductTag],
    }),
    setPriceToProduct: builder.mutation<
      void,
      { sellingPrice: number; productId: number; unitId: number }
    >({
      query: ({ productId, sellingPrice, unitId }) => ({
        url: `products/${productId}/price/sale`,
        method: "POST",
        body: {
          sellingPrice,
          unitId,
        },
      }),
      invalidatesTags: [ProductTag],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useSetUnitToProductMutation,
  useSetPriceToProductMutation,
  useGetProductByIdQuery,
} = unitSlice;
