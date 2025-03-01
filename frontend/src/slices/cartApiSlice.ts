import {
  ICart,
  IMutationResponse,
} from "../interfaces/interfaces";
import { apiSlice } from "./apiSlice";

const CART_URL = "/api/cart";

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<IMutationResponse<ICart>, {productId: string, quantity:number}>({
      query: (data) => ({
        url: `${CART_URL}/add`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),

    getUserCart: builder.query<ICart, void>({
      query: () => `${CART_URL}`,
      providesTags: ["Cart"],
    }),
  }),
});

export const { useAddToCartMutation, useGetUserCartQuery } = cartApiSlice;
