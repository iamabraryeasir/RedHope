/**
 * Node Modules
 */
import { type BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosError, type AxiosRequestConfig } from "axios";

/**
 * Local Modules
 */
import { axiosInstance } from "@/lib/axios";

/**
 * Configure Axios Base Query
 */
const axiosBaseQuery =
    (): BaseQueryFn<
        {
            url: string;
            method?: AxiosRequestConfig["method"];
            data?: AxiosRequestConfig["data"];
            body?: AxiosRequestConfig["data"];
            params?: AxiosRequestConfig["params"];
            headers?: AxiosRequestConfig["headers"];
        },
        unknown,
        unknown
    > =>
    async ({ url, method, data, body, params, headers }) => {
        try {
            // Support both `data` (preferred) and legacy `body` (if any caller still uses it)
            const payload = data ?? body;

            // Debug outgoing payload in development for diagnosis
            if (process.env.NODE_ENV === "development") {
                console.debug("axiosBaseQuery outgoing request:", {
                    url,
                    method,
                    payload,
                    params,
                });
            }

            const result = await axiosInstance({
                url: url,
                method,
                data: payload,
                params,
                headers,
            });
            return { data: result.data };
        } catch (axiosError) {
            const err = axiosError as AxiosError;
            return {
                error: {
                    status: err.response?.status,
                    data: err.response?.data || err.message,
                },
            };
        }
    };

export default axiosBaseQuery;
