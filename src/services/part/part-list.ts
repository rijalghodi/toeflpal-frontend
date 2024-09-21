import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Storage } from '../types';

type PartListRequest = {
  formId: string;
};

type PartListResponse = GResponse<
  {
    id: string;
    name?: string;
    order: number;
    instruction?: string;
    instructionAudio?: Storage;
    closing?: string;
    closingAudio?: Storage;
  }[]
>;

export const partlList = async ({
  formId,
}: PartListRequest): Promise<PartListResponse> => {
  const response = await axiosInstance.get<PartListResponse>(
    `/form/${formId}/part`,
  );
  return response.data;
};

export const partListKey = (req: PartListRequest) => ['part-list', req.formId];
