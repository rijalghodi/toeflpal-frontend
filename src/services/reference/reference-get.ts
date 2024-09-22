import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Storage } from '../types';

type ReferenceGetRequest = {
  referenceId: string;
};

type ReferenceGetResponse = GResponse<{
  id: string;
  name?: string;
  text?: string;
  audio?: Storage;
}>;

export const referenceGet = async ({
  referenceId,
}: ReferenceGetRequest): Promise<ReferenceGetResponse> => {
  const response = await axiosInstance.get<ReferenceGetResponse>(
    `/reference/${referenceId}`,
  );
  return response.data;
};

export const referenceGetKey = (req: ReferenceGetRequest) => [
  'reference-list',
  req.referenceId,
];
