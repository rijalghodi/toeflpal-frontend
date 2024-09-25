import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { ToeflEval } from '../types';

type EvalGetRequest = {
  toeflId: string; // 'true' or 'false'
};

type EvalGetResponse = GResponse<ToeflEval>;

export const evalGet = async ({
  toeflId,
}: EvalGetRequest): Promise<EvalGetResponse> => {
  const response = await axiosInstance.get<EvalGetResponse>(
    `/toefl/${toeflId}/eval`,
  );
  return response.data;
};

export const evalGetKey = (req: EvalGetRequest) => ['eval-get', req.toeflId];
