import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type ToeflPublishRequest = {
  toeflId: string;
  publish: boolean;
};

type ToeflPublishResponse = GResponse<{
  id: string;
  publishedAt: string;
}>;

export const toeflPublish = async ({
  toeflId,
  publish,
}: ToeflPublishRequest): Promise<ToeflPublishResponse> => {
  const response = await axiosInstance.post<ToeflPublishResponse>(
    `/toefl/${toeflId}/publish`,
    { publish },
  );
  return response.data;
};
