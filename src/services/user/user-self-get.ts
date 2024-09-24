import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type UserSelfResponse = GResponse<{
  email: string;
  roles: string[];
  createdAt: string;
  id: string;
}>;

export const userSelfGet = async (): Promise<UserSelfResponse> => {
  const response = await axiosInstance.get<UserSelfResponse>('/user/self');
  return response.data;
};

export const userSelfGetKey = () => ['user-self-get'];

export async function userSelfGetServer(
  options: { timeout?: number } & RequestInit = {},
): Promise<Response> {
  const { timeout = 30 * 1000 } = options; // 30 seconds

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/user/self`,
    {
      ...options,
      signal: controller.signal,
    },
  );
  clearTimeout(id);

  return response;
}
