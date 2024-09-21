import { AxiosError } from 'axios';

export type SortDir = 'asc' | 'desc';

export type CResponse<T> = { message: string; code: number } & T;
// C means Common

export type GResponse<T> = CResponse<{ data: T }>;
// G means Global

export type MResponse<T> = GResponse<T> & {
  pagination: {
    page: number;
    totalPage: number;
    pageSize: number;
    totalData: number;
  };
};

export type MRequest<SortByValue = string> = {
  page?: number;
  limit?: number;
  search?: string;
  sort?: SortByValue;
  order?: SortDir;
};

export type ValidationError = {
  field: string;
  message: string;
};

export type RestErrorResponse = {
  message: string;
  // errors: ValidationError[];
  errors: Record<string, string[]>;
};

export type GErrorResponse = AxiosError<RestErrorResponse>;
// G menas Global
