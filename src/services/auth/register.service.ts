import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type RegisterRequest = {
  email: string;
  password: string;
};

type RegisterResponse = GResponse<{
  email: string;
}>;

export const register = async (req: RegisterRequest) => {
  const response = await axiosInstance.post<RegisterResponse>(
    '/auth/register',
    req,
  );
  return response.data;
};
