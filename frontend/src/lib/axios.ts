/**
 * Node Modules
 */
import axios, { type AxiosRequestConfig } from "axios";

/**
 * Local Modules
 */
import config from "@/config";

/**
 * Creating Axios Instance
 */
export const axiosInstance = axios.create({
  baseURL: config.baseUrl,
  withCredentials: true,
});

/**
 * Setup Request Interceptor
 */
axiosInstance.interceptors.request.use(
  function (config) {
    try {
      // Defensive: Normalize urgency for outgoing requests to /requests
      if (
        config &&
        config.url &&
        config.method &&
        config.method.toString().toLowerCase() === "post" &&
        config.url.toString().includes("/requests")
      ) {
        interface ReqData {
          urgency?: unknown;
          [k: string]: unknown;
        }

        const data = (config as AxiosRequestConfig & { data?: ReqData }).data;
        if (data && typeof data === "object") {
          const raw = data.urgency;
          if (raw !== undefined) {
            let urgency = String(raw).trim().toUpperCase();
            if (urgency === "MEDIUM") urgency = "NORMAL";
            const allowed = ["LOW", "NORMAL", "HIGH", "EMERGENCY"];
            if (!allowed.includes(urgency)) urgency = "NORMAL";
            (config as AxiosRequestConfig & { data?: ReqData }).data = {
              ...data,
              urgency,
            };
          }
        }
      }
    } catch (e) {
      // ignore - don't block request on normalization errors
  console.debug("axios request normalization failed", e);
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

/**
 * State for handling the access token refresh period
 */
let isRefreshing = false;

/**
 * State for storing the requests send during the access token refresh period
 */
let pendingQueue: {
  resolve: (value: unknown) => void;
  reject: (value: unknown) => void;
}[] = [];

/**
 * Processing the pending request queued during access token refresh
 */
const processQueue = (error: unknown) => {
  pendingQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(null);
    }
  });

  pendingQueue = [];
};

/**
 * Add a response interceptor
 */
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry: boolean;
    };

    // if the access token is expired
    if (
      error.response.status === 500 &&
      error.response.data.message === "jwt expired" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          pendingQueue.push({ resolve, reject });
        })
          .then(() => axiosInstance(originalRequest))
          .catch((error) => Promise.reject(error));
      }

      isRefreshing = true;
      try {
        // use the refresh token for getting a new access token
        await axiosInstance.post("/auth/refresh-token");

        processQueue(null);

        return axiosInstance(originalRequest);
      } catch (error) {
        processQueue(error);
        return Promise.reject(error);
      } finally {
        isRefreshing = false;
      }
    }

    // For Everything
    return Promise.reject(error);
  }
);
