import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { FormPublic as FormMeta } from '../types';

type GetToeflRequest = {
  toeflId: string;
};

type ToeflVersionActiveGetResponse = GResponse<{
  id: string;
  active: boolean;
  readingSection: FormMeta;
  listeningSection: FormMeta;
  grammarSection: FormMeta;
}>;

export const toeflVersionActiveGet = async ({
  toeflId,
}: GetToeflRequest): Promise<ToeflVersionActiveGetResponse> => {
  const response = await axiosInstance.get<ToeflVersionActiveGetResponse>(
    `/toefl/${toeflId}/version/active`,
  );
  return response.data;
};

export const toeflVersionActiveGetKey = (req: GetToeflRequest) => [
  'toefl-get-active-version',
  req.toeflId,
];
