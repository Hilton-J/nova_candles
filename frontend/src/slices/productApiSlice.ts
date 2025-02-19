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

    getAllProduct: builder.query<ApiResponce<IProduct>, { page?: number }>({
      query: ({ page }) => `${PRODUCT_URL}?page=${page}`,
      providesTags: ["Product"],
    }),
  }),
});
