import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type ToeflUpdateRequest = {
  toeflId: string;
  name?: string;
  description?: string;
  allowReview?: boolean;
  instruction?: string;
  closing?: string;
};

type ToeflUpdateResponse = GResponse<{
  id: string;
}>;

export const toeflUpdate = async ({
  toeflId,
  ...req
}: ToeflUpdateRequest): Promise<ToeflUpdateResponse> => {
  const response = await axiosInstance.patch<ToeflUpdateResponse>(
    `/toefl/${toeflId}`,
    req,
  );
  return response.data;
};
