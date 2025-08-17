export interface IErrorSources {
    path: string;
    message: string;
}

export interface IGenericErrorResponse {
    statusCode: number;
    message: string;
    errorSources?: IErrorSources[];
}
