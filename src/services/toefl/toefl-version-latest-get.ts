import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Form } from '../types';

type GetToeflRequest = {
  toeflId: string;
};

type ToeflVersionLatesGetResponse = GResponse<{
  id: string;
  active: boolean;
  readingSection: Form;
  listeningSection: Form;
  grammarSection: Form;
}>;

export const toeflVersionLatestGet = async ({
  toeflId,
}: GetToeflRequest): Promise<ToeflVersionLatesGetResponse> => {
  const response = await axiosInstance.get<ToeflVersionLatesGetResponse>(
    `/toefl/${toeflId}/version/latest`,
  );
  return response.data;
};
