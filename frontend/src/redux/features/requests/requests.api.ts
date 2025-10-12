import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";

export interface IRequestCreatePayload {
    patientName: string;
    bloodGroup: string;
    unitsNeeded: number;
    urgency: string;
    reasonOfRequest?: string;

    hospitalName: string;
    hospitalAddress?: string;
    hospitalCity: string;
    hospitalDistrict: string;

    contactPhone: string;
    altContactPhone?: string;

    // ISO date string (optional)
    neededBy?: string;
}

export interface IRequest {
    _id: string;
    patientName: string;
    bloodGroup: string;
    unitsNeeded: number;
    urgency: string;
    reasonOfRequest: string;
    hospitalName: string;
    hospitalAddress: string;
    hospitalCity: string;
    hospitalDistrict: string;
    contactPhone: string;
    altContactPhone?: string;
    neededBy: string;
    status?: string;
    createdAt?: string;
}

export const requestsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRequests: builder.query<IResponse<IRequest[]>, void>({
            query: () => ({ url: "/requests", method: "GET" }),
            providesTags: ["REQUESTS"],
        }),
        createRequest: builder.mutation<
            IResponse<IRequest>,
            IRequestCreatePayload
        >({
            query: (data) => {
                // sanitize and normalize urgency to backend allowed values
                const allowed = ["LOW", "NORMAL", "HIGH", "EMERGENCY"];
                let urgency = (data.urgency ?? "")
                    .toString()
                    .trim()
                    .toUpperCase();
                if (urgency === "MEDIUM") urgency = "NORMAL"; // legacy mapping
                if (!allowed.includes(urgency)) urgency = "NORMAL";

                const payload = {
                    ...data,
                    urgency,
                } as IRequestCreatePayload;

                return { url: "/requests", method: "POST", data: payload };
            },
            invalidatesTags: ["REQUESTS"],
        }),
        getAdminRequests: builder.query<IResponse<IRequest[]>, void>({
            query: () => ({ url: "/requests/admin/all", method: "GET" }),
            providesTags: ["REQUESTS"],
        }),
        updateRequestStatus: builder.mutation<
            IResponse<null>,
            { requestId: string; status: string }
        >({
            query: ({ requestId, status }) => ({
                url: `/requests/${requestId}/status`,
                method: "PATCH",
                data: { status },
            }),
            invalidatesTags: ["REQUESTS"],
        }),
        // Delete /requests/:id/respond (delete a request response)
        deleteRequestRespond: builder.mutation<
            IResponse<null>,
            { requestId: string }
        >({
            query: ({ requestId }) => ({
                url: `/requests/${requestId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["REQUESTS"],
        }),
    }),
});

export const {
    useGetRequestsQuery,
    useCreateRequestMutation,
    useGetAdminRequestsQuery,
    useUpdateRequestStatusMutation,
    useDeleteRequestRespondMutation,
} = requestsApi;
