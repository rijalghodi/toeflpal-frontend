import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type ToeflPremiumRequest = {
  toeflId: string;
  premium: boolean;
};

type ToeflPremiumResponse = GResponse<{
  id: string;
  premium: boolean;
}>;

export const toeflPremium = async ({
  toeflId,
  premium,
}: ToeflPremiumRequest): Promise<ToeflPremiumResponse> => {
  const response = await axiosInstance.post<ToeflPremiumResponse>(
    `/toefl/${toeflId}/premium`,
    { premium },
  );
  return response.data;
};
