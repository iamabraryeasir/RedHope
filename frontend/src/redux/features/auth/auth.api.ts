/**
 * Local Modules
 */
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type {
  ILogin,
  ILoginResponse,
  ISendVerificationCode,
  ISignupRequest,
  ISignupResponse,
  IUserInfoResponse,
  IVerifyOTP,
} from "@/types/auth.types";

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

    signup: builder.mutation<IResponse<ISignupResponse>, ISignupRequest>({
      query: (signupDetails) => ({
        url: "/users/register",
        method: "POST",
        data: signupDetails,
      }),
      invalidatesTags: ["USER"],
    }),

    userInfo: builder.query<IResponse<IUserInfoResponse>, null>({
      query: () => ({
        url: "/users/me",
        method: "GET",
      }),
      providesTags: ["USER"],
    }),

    sendOtp: builder.mutation<IResponse<null>, ISendVerificationCode>({
      query: (email) => ({
        url: "/otp/send",
        method: "POST",
        data: email,
      }),
    }),

    verifyOtp: builder.mutation<IResponse<null>, IVerifyOTP>({
      query: (email) => ({
        url: "/otp/verify",
        method: "POST",
        data: email,
      }),
    }),
  }),
});

/**
 * Exporting the Hooks
 */
export const {
  useLoginMutation,
  useLogoutMutation,
  useUserInfoQuery,
  useSignupMutation,
  useSendOtpMutation,
  useVerifyOtpMutation,
} = authApi;
