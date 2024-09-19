import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type ListToeflRequest = {
  published?: boolean | null | string; // 'true' or 'false'
};

type ListToeflResponse = GResponse<
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

export const listToefl = async ({
  published,
}: ListToeflRequest): Promise<ListToeflResponse> => {
  const response = await axiosInstance.get<ListToeflResponse>('/toefl', {
    params: { published },
  });
  return response.data;
};
