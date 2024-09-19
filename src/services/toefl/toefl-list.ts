import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type ToeflListRequest = {
  published?: boolean | null | string; // 'true' or 'false'
};

type ToeflListResponse = GResponse<
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

export const toeflList = async ({
  published,
}: ToeflListRequest): Promise<ToeflListResponse> => {
  const response = await axiosInstance.get<ToeflListResponse>('/toefl', {
    params: { published },
  });
  return response.data;
};
