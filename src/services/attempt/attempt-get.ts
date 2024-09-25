import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { AttemptWithRemainingTime } from '../types';

type AttemptGetRequest = {
  formId: string; // 'true' or 'false'
};

type AttemptGetResponse = GResponse<AttemptWithRemainingTime>;

export const attemptGet = async ({
  formId,
}: AttemptGetRequest): Promise<AttemptGetResponse> => {
  const response = await axiosInstance.get<AttemptGetResponse>(
    `/form/${formId}/attempt`,
  );
  return response.data;
};

export const attemptGetKey = (req: AttemptGetRequest) => [
  'attempt-get',
  req.formId,
];
