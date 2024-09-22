import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type OptionUpdateRequest = {
  text?: string;
  optionId: string;
};

type OptionUpdateResponse = GResponse<{
  id: string;
}>;

export const optionUpdate = async ({
  optionId,
  text,
}: OptionUpdateRequest): Promise<OptionUpdateResponse> => {
  const response = await axiosInstance.patch<OptionUpdateResponse>(
    `/option/${optionId}`,
    { text },
  );
  return response.data;
};
