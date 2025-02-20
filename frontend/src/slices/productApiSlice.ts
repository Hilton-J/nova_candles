import {
  IProduct,
  ApiResponce,
  IMutationResponse,
} from "../interfaces/interfaces";
import { apiSlice } from "./apiSlice";

const PRODUCT_URL = "/api/products";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProduct: builder.mutation<IMutationResponse, Partial<IProduct>>({
      query: (data) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    getAllProduct: builder.query<ApiResponce<IProduct>, number>({
      query: (page) => `${PRODUCT_URL}?page=${page}`,
      providesTags: ["Product"],
    }),

    getProductById: builder.query<IProduct, string>({
      query: (id) => `${PRODUCT_URL}/${id}`,
      providesTags: ["Product"],
    }),

    updateProduct: builder.mutation<
      IMutationResponse<IProduct>,
      { id: string; data: Partial<IProduct> }
    >({
      query: ({ id, data }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation<IMutationResponse, string>({
      query: (id) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    deactivateProduct: builder.mutation<
      IMutationResponse<IProduct>,
      { id: string; data: Partial<IProduct> }
    >({
      query: ({ id, data }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    reviewProduct: builder.mutation<
      IMutationResponse<IProduct>,
      { id: string; data: Partial<IProduct> }
    >({
      query: ({ id, data }) => ({
        url: `${PRODUCT_URL}/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useDeactivateProductMutation,
  useReviewProductMutation,
} = productApiSlice;
