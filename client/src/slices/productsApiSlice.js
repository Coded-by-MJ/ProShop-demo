import { PRODUCTS_URL, UPLOAD_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: PRODUCTS_URL,
        params: { keyword, pageNumber },
      }),
      // keepUnusedDataFor: 5,
      providesTags: [{ type: "Product" }],
    }),
    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
      providesTags: (result, error, id) => [{ type: "Product", id }],
      invalidatesTags: (result, error, id) => [
        { type: "Product" }, // generic list
        { type: "Product", id }, // specific user
      ],
    }),
    createProduct: builder.mutation({
      query: () => ({
        url: PRODUCTS_URL,
        method: "POST",
      }),
      invalidatesTags: [{ type: "Product" }],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}`,
        method: "PUT",
        body: data,
      }),

      invalidatesTags: (result, error, { productId }) => [
        { type: "Product" },
        { type: "Product", id: productId },
      ],
    }),
    uploadProductImage: builder.mutation({
      query: (data) => ({
        url: `${UPLOAD_URL}`,
        method: "POST",
        body: data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `${PRODUCTS_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "Product" }],
    }),
    createReview: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTS_URL}/${data.productId}/reviews`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: (result, error, { productId }) => [
        { type: "Product" },
        { type: "Product", id: productId },
      ],
    }),
    getTopProducts: builder.query({
      query: () => `${PRODUCTS_URL}/top`,
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetProductsQuery,
  useCreateProductMutation,
  useCreateReviewMutation,
  useDeleteProductMutation,
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
  useGetTopProductsQuery,
} = productsApiSlice;
