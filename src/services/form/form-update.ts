import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { SkillType } from '../types';

type FormUpdateRequest = {
  formId: string;
  name?: string;
  duration?: number;
  allowReview?: boolean;
  instruction?: string;
  instructionAudio?: File | null;
  skillType?: SkillType;
  closing?: string;
  closingAudio?: File | null;
};

type FormUpdateResponse = GResponse<{
  id: string;
}>;

export const formdUpdate = async ({
  formId,
  name,
  duration,
  allowReview,
  instruction,
  instructionAudio,
  skillType,
  closing,
  closingAudio,
}: FormUpdateRequest): Promise<FormUpdateResponse> => {
  const formData = new FormData();

  if (name) formData.append('name', name);
  if (duration !== undefined) formData.append('duration', String(duration));
  if (allowReview !== undefined)
    formData.append('allowReview', String(allowReview));
  if (instruction) formData.append('instruction', instruction);
  if (instructionAudio) formData.append('instructionAudio', instructionAudio);
  if (skillType) formData.append('skillType', String(skillType));
  if (closing) formData.append('closing', closing);
  if (closingAudio) formData.append('closingAudio', closingAudio);

  const response = await axiosInstance.patch<FormUpdateResponse>(
    `/form/${formId}`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );

  return response.data;
};
