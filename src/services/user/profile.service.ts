import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type ListToeflResponse = GResponse<{
  email: string;
  roles: string[];
  createdAt: string;
}>;

export const getProfile = async (): Promise<ListToeflResponse> => {
  const response = await axiosInstance.get<ListToeflResponse>('/user/profile');
  return response.data;
};

export async function getProfileServer(
  options: { timeout?: number } & RequestInit = {},
): Promise<Response> {
  const { timeout = 30 * 1000 } = options; // 30 seconds

  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASE_URL as string}/user/profile`,
    {
      ...options,
      signal: controller.signal,
    },
  );
  clearTimeout(id);

  return response;
}
