import { GResponse } from '@/types';

import { client } from '../client';

type RegisterRequest = {
  email: string;
  password: string;
};

type RegisterResponse = GResponse<{
  email: string;
}>;

export const register = async (req: RegisterRequest) => {
  const response = await client.post<RegisterResponse>('/auth/register', req);
  return response.data;
};
