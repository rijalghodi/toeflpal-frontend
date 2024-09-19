import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type ToeflCreateRequest = {
  name: string;
  description?: string;
  allowReview?: boolean;
  instruction?: string;
  closing?: string;
};

type ToeflCreateResponse = GResponse<{
  id: string;
}>;

export const toeflCreate = async (
  req: ToeflCreateRequest,
): Promise<ToeflCreateResponse> => {
  const response = await axiosInstance.post<ToeflCreateResponse>('/toefl', req);
  return response.data;
};
