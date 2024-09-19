import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Toefl } from '../types';

type ToeflGetRequest = {
  toeflId: string; // 'true' or 'false'
};

type ToeflGetResponse = GResponse<Toefl>;

export const toeflGet = async ({
  toeflId,
}: ToeflGetRequest): Promise<ToeflGetResponse> => {
  const response = await axiosInstance.get<ToeflGetResponse>(
    `/toefl/${toeflId}`,
  );
  return response.data;
};
