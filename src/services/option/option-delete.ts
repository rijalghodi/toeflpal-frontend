import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type OptionDeleteRequest = {
  optionId: string;
};

type OptionDeleteResponse = GResponse<{
  id: string;
}>;

export const optionDelete = async ({
  optionId,
}: OptionDeleteRequest): Promise<OptionDeleteResponse> => {
  const response = await axiosInstance.delete<OptionDeleteResponse>(
    `/option/${optionId}`,
  );
  return response.data;
};
