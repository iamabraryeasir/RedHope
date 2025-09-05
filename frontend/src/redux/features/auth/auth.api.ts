/**
 * Local Modules
 */
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ILogin, ILoginResponse } from "@/types/auth.types";

/**
 * Auth API
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<ILoginResponse>, ILogin>({
      query: (loginDetails) => ({
        url: "/auth/login",
        method: "POST",
        data: loginDetails,
      }),
    }),
    userInfo: builder.query({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),
  }),
});

/**
 * Exporting the Hooks
 */
export const { useLoginMutation, useUserInfoQuery } = authApi;
