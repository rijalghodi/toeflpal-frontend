import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Attempt } from '../types';

type EvalStaleRequest = {
  toeflId: string;
  stale: boolean;
};

type EvalStaleResponse = GResponse<Attempt>;

export const evalStale = async ({
  toeflId,
  stale,
}: EvalStaleRequest): Promise<EvalStaleResponse> => {
  const response = await axiosInstance.post<EvalStaleResponse>(
    `/toefl/${toeflId}/eval/stale`,
    {
      stale,
    },
  );
  return response.data;
};
