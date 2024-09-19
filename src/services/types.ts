export type Form = {
  id: string;
  name: string;
  duration: number | null;
  allowReview: boolean | null;
  testType: string;
  instruction: string | null;
  closing: string | null;
};

export type Toefl = {
  id: string;
  name: string;
  description?: string;
  premium: boolean;
  instruction?: string;
  closing?: string;
  publishedAt?: string;
};
