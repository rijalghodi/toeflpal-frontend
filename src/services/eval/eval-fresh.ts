import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Toefl } from '../types';

type EvalFreshRequest = {
  toeflId: string; // 'true' or 'false'
};

type EvalFreshResponse = GResponse<Toefl>;

export const evalFresh = async ({
  toeflId,
}: EvalFreshRequest): Promise<EvalFreshResponse> => {
  const response = await axiosInstance.get<EvalFreshResponse>(
    `/toefl/${toeflId}/eval/fresh`,
  );
  return response.data;
};

export const evalFreshKey = (req: EvalFreshRequest) => [
  'eval-refresh',
  req.toeflId,
];
