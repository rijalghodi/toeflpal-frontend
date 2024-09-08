import { GResponse } from '@/types';

import { client } from '../client';

type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = GResponse<{
  id: string;
  email: string;
  roles: string[];
  accessToken: {
    accessToken: string;
    expiredAt: string;
  };
}>;

export const login = async (req: LoginRequest): Promise<LoginResponse> => {
  const response = await client.post<LoginResponse>('/auth/login', req);
  return response.data;
};
