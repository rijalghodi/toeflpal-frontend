import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type OptionListRequest = {
  questionId: string;
};

type OptionListResponse = GResponse<
  {
    text?: string;
    id: string;
    order: string;
  }[]
>;

export const optionList = async ({
  questionId,
}: OptionListRequest): Promise<OptionListResponse> => {
  const response = await axiosInstance.get<OptionListResponse>(
    `/question/${questionId}/option`,
  );
  return response.data;
};

export const optionListKey = (req: OptionListRequest) => [
  'option-list',
  req.questionId,
];
