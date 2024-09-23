import { MRequest, MResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type ToeflListRequest = {
  published?: boolean | null | string; // 'true' or 'false'
  premium?: boolean | null | string; // 'true' or 'false'
} & MRequest;

type ToeflListResponse = MResponse<
  {
    id: string;
    name: string;
    description?: string;
    premium: boolean;
    instruction?: string;
    closing?: string;
    publishedAt?: string;
  }[]
>;

export const toeflList = async (
  req: ToeflListRequest,
): Promise<ToeflListResponse> => {
  const response = await axiosInstance.get<ToeflListResponse>('/toefl', {
    params: req,
  });
  return response.data;
};

export const toeflListKey = (req: ToeflListRequest) => ['toefl-list', req];
