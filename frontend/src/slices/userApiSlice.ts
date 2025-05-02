import {
  IUser,
  IMutationResponse,
  ApiResponce,
  LoginRequest,
} from "../interfaces/interfaces";
import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IUser, LoginRequest>({
      query: (data) => ({
        url: `${USERS_URL}/login`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    registerUser: builder.mutation<IMutationResponse, Partial<IUser>>({
      query: (data) => ({
        url: `${USERS_URL}/register`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getAllUsers: builder.query<ApiResponce<IUser>, number>({
      query: (page) => `${USERS_URL}?page=${page}`,
      providesTags: ["User"],
    }),

    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: "POST",
      }),
      invalidatesTags: ["User"],
    }),

    updateUser: builder.mutation<IMutationResponse<IUser>, Partial<IUser>>({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} = userApiSlice;
