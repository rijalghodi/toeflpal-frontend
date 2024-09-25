import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { ToeflEval } from '../types';

type EvalListResponse = GResponse<ToeflEval[]>;

export const evalList = async (): Promise<EvalListResponse> => {
  const response = await axiosInstance.get<EvalListResponse>(`/toefl-eval`);
  return response.data;
};

export const evalListKey = () => ['eval-list'];
