import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Form, Part, Question } from '../types';

type FormGetFullRequest = {
  formId: string;
};

type FormGetFullResponse = GResponse<
  Form & {
    parts: Part[];
    questions: Question[];
    partLength: number;
    questionLength: number;
    questionLengthPerPart: number[];
  }
>;

export const formGetFull = async ({
  formId,
}: FormGetFullRequest): Promise<FormGetFullResponse> => {
  const response = await axiosInstance.get<FormGetFullResponse>(
    `/form/${formId}/full`,
  );
  return response.data;
};

export const formGetFullKey = (req: FormGetFullRequest) => [
  'form-get-full',
  req.formId,
];
