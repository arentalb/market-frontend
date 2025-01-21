import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { ProductTag } from "@/constants/tags.ts";
import {
  Product,
  ProductDetail,
} from "@/features/product/types/product.types.ts";

import {
  createProductSchemaType,
  updateProductSchemaType,
} from "@/features/product/schemas/productSchemas.ts";
import { ProductSearchResult } from "@/features/purchase/types/purchaseProduct.types.ts";

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
      ApiResponse<{ product: Product }>,
      { id: number }
    >({
      query: ({ id }) => ({
        url: `products/${id}`,
        method: "GET",
      }),
      providesTags: (_result, _error, arg) => [{ type: "Product", id: arg.id }],
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
    updateProduct: builder.mutation<
      ApiResponse<{ products: Product }>,
      {
        data: updateProductSchemaType;
        productId: number;
      }
    >({
      query: (data) => ({
        url: `products/${data.productId}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: (_result, _error, arg) => [
        { type: "Product", id: arg.productId },
        ProductTag,
      ],
    }),
    deleteProduct: builder.mutation<
      ApiResponse<{ product: Product }>,
      {
        productId: number;
      }
    >({
      query: (data) => ({
        url: `products/${data.productId}`,
        method: "DELETE",
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
    searchProducts: builder.query<
      ApiResponse<{ products: ProductSearchResult[] }>,
      { name: string }
    >({
      query: ({ name }) => ({
        url: `products/search`,
        method: "GET",
        params: { name },
      }),
      providesTags: [ProductTag],
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
  useUpdateProductMutation,
  useDeleteProductMutation,
  useSearchProductsQuery,
} = productSlice;
