import apiSlice from "../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import {
  LoginRequest,
  RegisterRequest,
  User,
} from "@/features/auth/auth.types.ts";

const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<{ user: User }>, LoginRequest>({
      query: (data) => ({
        url: `auth/sign-in`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: `auth/sign-out`,
        method: "POST",
      }),
    }),
    register: builder.mutation<ApiResponse<string>, RegisterRequest>({
      query: (data) => ({
        url: `auth/sign-up`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authSlice;
