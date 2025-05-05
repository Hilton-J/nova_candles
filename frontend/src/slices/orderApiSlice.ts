import {
  IMutationResponse,
  IOrder,
  ApiResponce,
} from "../interfaces/interfaces";
import { apiSlice } from "./apiSlice";

const ORDER_URL = "/api/orders";

const orderApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation<IMutationResponse, Partial<IOrder>>({
      query: (data) => ({
        url: `${ORDER_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Order"],
    }),

    getAllOrder: builder.query<ApiResponce<IOrder>, number>({
      query: (page) => `${ORDER_URL}?page=${page}`,
      providesTags: ["Order"],
    }),

    getOrdersByCustomer: builder.query<ApiResponce<IOrder>, number>({
      query: (page) => `${ORDER_URL}/customer?page=${page}`,
      providesTags: ["Order"],
    }),
  }),
});

export const {
  usePlaceOrderMutation,
  useGetAllOrderQuery,
  useGetOrdersByCustomerQuery,
} = orderApiSlice;
