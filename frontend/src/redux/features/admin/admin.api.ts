/**
 * Local Modules
 */
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IAdminAnalysisResponse } from "@/types/admin.types";

/**
 * Admin API
 */

export const adminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        adminAnalysis: builder.query<IResponse<IAdminAnalysisResponse>, null>({
            query: () => ({
                url: "/admin/analytics/dashboard",
                method: "GET",
            }),
            providesTags: ["ANALYSIS"],
        }),
    }),
});

/**
 * Exporting the Hooks
 */
export const { useAdminAnalysisQuery } = adminApi;
