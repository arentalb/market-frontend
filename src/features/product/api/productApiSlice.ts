import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { ProductTag } from "@/constants/tags.ts";
import {
  Product,
  ProductDetail,
} from "@/features/product/types/product.types.ts";
import { createProductSchemaType } from "@/features/product/schema/schema.ts";

const productSlice = apiSlice.injectEndpoints({
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
    }),
    getProductSalePriceHistory: builder.query<
      ApiResponse<{ product: ProductDetail }>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `products/${id}/price/sale/history`,
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
    setPriceToProduct: builder.mutation<
      void,
      { sellingPrice: number; productId: number; unitId: number }
    >({
      query: ({ productId, sellingPrice, unitId }) => ({
        url: `products/${productId}/price/sale`,
        method: "POST",
        body: { sellingPrice, unitId },
      }),
      invalidatesTags: [ProductTag],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductSalePriceHistoryQuery,
  useCreateProductMutation,
  useSetPriceToProductMutation,
} = productSlice;
