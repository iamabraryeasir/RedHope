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
}
