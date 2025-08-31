/**
 * Local Modules
 */
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { ILogin } from "@/types/auth.types";

/**
 * Auth API
 */
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<IResponse<null>, ILogin>({
      query: (loginDetails) => ({
        url: "/auth/login",
        method: "POST",
        data: loginDetails,
      }),
    }),
  }),
});

/**
 * Exporting the Hooks
 */
export const { useLoginMutation } = authApi;
