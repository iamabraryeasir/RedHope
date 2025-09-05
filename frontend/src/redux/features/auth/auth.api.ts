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
    logout: builder.mutation<IResponse<null>, null>({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      invalidatesTags: ["USER"],
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
export const { useLoginMutation, useLogoutMutation, useUserInfoQuery } =
  authApi;
