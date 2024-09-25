import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Toefl } from '../types';

type EvalRefreshRequest = {
  toeflId: string; // 'true' or 'false'
};

type EvalRefreshResponse = GResponse<Toefl>;

export const evalRefresh = async ({
  toeflId,
}: EvalRefreshRequest): Promise<EvalRefreshResponse> => {
  const response = await axiosInstance.get<EvalRefreshResponse>(
    `/toefl/${toeflId}/eval/refresh`,
  );
  return response.data;
};

export const evalRefreshKey = (req: EvalRefreshRequest) => [
  'eval-refresh',
  req.toeflId,
];
