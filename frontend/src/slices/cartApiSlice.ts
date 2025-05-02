import { apiSlice } from "./apiSlice";
import { ICart, IMutationResponse } from "../interfaces/interfaces";

const CART_URL = "/api/cart";

const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addToCart: builder.mutation<
      IMutationResponse<ICart>,
      {
        productId: string;
        quantity: number;
        price: number;
        productName: string;
        fragrance: string;
        size: string;
        image: string;
      }
    >({
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

    removeCartItem: builder.mutation<IMutationResponse<ICart>, string>({
      query: (productId) => ({
        url: `${CART_URL}/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    updateItemQuantity: builder.mutation<
      IMutationResponse<ICart>,
      { productId?: string; quantity: number }
    >({
      query: (data) => ({
        url: `${CART_URL}/update`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetUserCartQuery,
  useRemoveCartItemMutation,
  useUpdateItemQuantityMutation,
} = cartApiSlice;
