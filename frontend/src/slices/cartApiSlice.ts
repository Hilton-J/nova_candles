import {
  ICart,
  ApiResponce,
  IMutationResponse,
} from "../interfaces/interfaces";
import { apiSlice } from "./apiSlice";

const CART_URL = "/api/cart";

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<IMutationResponse, Partial<ICart>>({
      query: (data) => ({
        url: `${CART_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
    getUserCart: builder.query<ApiResponce<ICart>, void>({
      query: () => `${CART_URL}`,
      providesTags: ["Cart"],
    }),
  }),
});

export const { useAddToCartMutation, useGetUserCartQuery } = cartApiSlice;
