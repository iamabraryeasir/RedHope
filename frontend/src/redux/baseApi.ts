/**
 * Node Modules
 */
import { createApi } from "@reduxjs/toolkit/query/react";

/**
 * Local Modules
 */
import axiosBaseQuery from "@/redux/axiosBaseQuery";

/**
 * Configure Base API
 */
export const baseApi = createApi({
    reducerPath: "baseApi",
    baseQuery: axiosBaseQuery(),
    tagTypes: ["USER", "ANALYSIS", "DONORS", "REQUESTS"], // tags
    endpoints: () => ({}),
});
