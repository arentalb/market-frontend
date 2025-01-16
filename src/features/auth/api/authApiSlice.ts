import apiSlice from "../../../app/apiSlice.ts";
import { ApiResponse } from "@/types/TApiResponse.ts";
import { User } from "@/features/auth/types/auth.types.ts";
import { loginSchemaType } from "@/features/auth/forms/schemas.ts";

const authSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ApiResponse<{ user: User }>, loginSchemaType>({
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
  }),
  overrideExisting: true,
});

export const { useLoginMutation, useLogoutMutation } = authSlice;
