import { AxiosError } from 'axios';

export type SortDir = 'asc' | 'desc';

export type CResponse<T> = { message: string; code: number } & T;
// C means Common

export type GResponse<T> = CResponse<{ data: T }>;
// G means Global

export type MResponse<T> = GResponse<T> & {
  meta: {
    current_page: number;
    from: number; // the index of first element of current page
    last_page: number; // total page
    per_page: number; // page size
    to: number; // last index of element in current page
    total: number; // total number of elements
  };
};

export type MRequest<SortByValue = string> = {
  page?: number;
  per_page?: number;
  search?: string;
  sort_by?: SortByValue;
  sort_dir?: SortDir;
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
