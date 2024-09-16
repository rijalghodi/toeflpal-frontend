import { GResponse } from '@/types';

import { client } from '../client';

type ListToeflRequest = {
  published?: boolean;
};

type ListToeflResponse = GResponse<
  {
    id: string;
    name: string;
    description?: string;
    premium: boolean;
    instruction?: string;
    closing?: string;
  }[]
>;

export const listToefl = async (
  req: ListToeflRequest,
): Promise<ListToeflResponse> => {
  const response = await client.get<ListToeflResponse>('/toefl', {
    params: { published: req.published },
  });
  return response.data;
};
