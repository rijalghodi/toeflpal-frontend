import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

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
  const response = await axiosInstance.post<LoginResponse>('/auth/login', req);
  return response.data;
};
