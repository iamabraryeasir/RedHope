/**
 * User Role Type
 */
export type TRole = "ADMIN" | "DONOR";

/**
 * General Response Type
 */
export interface IResponse<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data: T;
  meta?: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
}
