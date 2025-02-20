import {
  ApiResponce,
  IMutationResponse,
  IPayment,
} from "../interfaces/interfaces";
import { apiSlice } from "./apiSlice";

const PAYMENT_URL = "/api/payments";

const paymentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPayment: builder.mutation<IMutationResponse, Partial<IPayment>>({
      query: (data) => ({
        url: `${PAYMENT_URL}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Payment"],
    }),

    getPayments: builder.query<ApiResponce<IPayment>, number>({
      query: (page) => `${PAYMENT_URL}?page=${page}`,
      providesTags: ["Payment"],
    }),
  }),
});

export const { useAddPaymentMutation, useGetPaymentsQuery } = paymentApiSlice;
