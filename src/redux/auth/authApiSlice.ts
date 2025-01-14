import apiSlice from "../apiSlice";
import { ApiResponse } from "@/redux/types/TApiResponse.ts";

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface User {
  username: string;
  email: string;
  role: string;
  isVerified: boolean;
}

const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<{ user: User }>, LoginRequest>({
      query: (data) => ({
        url: `auth/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation<ApiResponse<null>, void>({
      query: () => ({
        url: `auth/logout`,
        method: "POST",
      }),
    }),
    register: builder.mutation<ApiResponse<string>, RegisterRequest>({
      query: (data) => ({
        url: `auth/register`,
        method: "POST",
        body: data,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useLogoutMutation, useRegisterMutation } =
  authSlice;
