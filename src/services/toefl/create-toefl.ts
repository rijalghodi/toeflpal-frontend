import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type CreateToeflRequest = {
  name: string;
  description?: string;
  allowReview?: boolean;
  instruction?: string;
  closing?: string;
};

type CreateToeflResponse = GResponse<{
  id: string;
}>;

export const createToefl = async (
  req: CreateToeflRequest,
): Promise<CreateToeflResponse> => {
  const response = await axiosInstance.post<CreateToeflResponse>('/toefl', req);
  return response.data;
};
