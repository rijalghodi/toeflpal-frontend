import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type ListToeflRequest = {
  published?: boolean;
};

type ListToeflResponse = GResponse<
  {
    id: string;
    name: string;
    description?: string;
    premium: boolean;
    instruction?: string;
    closing?: string;
  }[]
>;

export const listToefl = async (
  req: ListToeflRequest,
): Promise<ListToeflResponse> => {
  const response = await axiosInstance.get<ListToeflResponse>('/toefl', {
    params: { published: req.published },
  });
  return response.data;
};
