import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';

type QuestionUpdateRequest = {
  text?: string;
  audio?: File | null;
  questionId: string;
  referenceId?: string;
};

type QuestionUpdateResponse = GResponse<{
  id: string;
}>;

export const questionUpdate = async ({
  questionId,
  referenceId,
  text,
  audio,
}: QuestionUpdateRequest): Promise<QuestionUpdateResponse> => {
  const formData = new FormData();

  if (referenceId) formData.append('referenceId', referenceId);
  if (text) formData.append('text', text);
  if (audio) formData.append('audio', audio);

  const response = await axiosInstance.patch<QuestionUpdateResponse>(
    `/question/${questionId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multireference/form-data',
      },
    },
  );

  return response.data;
};
