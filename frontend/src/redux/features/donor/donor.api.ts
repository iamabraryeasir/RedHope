// donor.api.ts
import { baseApi } from "@/redux/baseApi";
import type { IResponse } from "@/types";
import type { IDonor } from "@/types/donors.types";

export interface DonorQueryParams {
  searchTerm?: string;
  sort?: string;
  fields?: string;
  page?: number;
  limit?: number;
  bloodGroup?: string;
  district?: string;
}

export const donorApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDonors: builder.query<IResponse<IDonor[]>, DonorQueryParams>({
      query: (params) => ({
        url: "/users",
        method: "GET",
        params,
      }),
      providesTags: ["DONORS"],
    }),
  }),
});

export const { useGetDonorsQuery } = donorApi;
