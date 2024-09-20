import { GResponse } from '@/types';

import { axiosInstance } from '../axiosInstance';
import { Form } from '../types';

type FormGetRequest = {
  formId: string;
};

type FormGetResponse = GResponse<Form>;

export const formGet = async ({
  formId,
}: FormGetRequest): Promise<FormGetResponse> => {
  const response = await axiosInstance.get<FormGetResponse>(`/form/${formId}`);
  return response.data;
};

export const formGetKey = (req: FormGetRequest) => ['form-get', req.formId];
