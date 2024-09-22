import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type QuestionCreateRequest = {
  text?: string;
  audio?: File | null;
  formId: string;
  partId: string;
  referenceId?: string;
};

type QuestionCreateResponse = GResponse<{
  id: string;
  order: number;
}>;

export const questionCreate = async ({
  formId,
  partId,
  referenceId,
  text,
  audio,
}: QuestionCreateRequest): Promise<QuestionCreateResponse> => {
  const formData = new FormData();

  if (partId) formData.append('partId', partId);
  if (referenceId) formData.append('referenceId', referenceId);
  if (text) formData.append('text', text);
  if (audio) formData.append('audio', audio);

  const response = await axiosInstance.post<QuestionCreateResponse>(
    `/form/${formId}/part/${partId}/question`,
    formData,
    {
      headers: {
        'Content-Type': 'multireference/form-data',
      },
    },
  );

  return response.data;
};
