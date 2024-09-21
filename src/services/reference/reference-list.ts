import { MRequest, MResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Storage } from '../types';

type ReferenceListRequest = MRequest;

type ReferenceListResponse = MResponse<
  {
    id: string;
    name?: string;
    text?: string;
    audio?: Storage;
  }[]
>;

export const referenceList = async (
  req: ReferenceListRequest,
): Promise<ReferenceListResponse> => {
  const response = await axiosInstance.get<ReferenceListResponse>(
    `/reference`,
    {
      params: req,
    },
  );
  return response.data;
};

export const referenceListKey = (req: ReferenceListRequest) => [
  'reference-list',
  req,
];
