export enum SkillType {
  Listening = 'listening',
  Grammar = 'grammar',
  Reading = 'reading',
}

export type Form = {
  id: string;
  name: string;
  duration: number | null;
  allowReview: boolean | null;
  skillType: SkillType;
  instruction: string | null;
  instructionAudio: File | null;
  closing: string | null;
  closingAudio: File | null;
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

export type File = {
  id: string;
  url: string;
  filename?: string;
  originalFilename?: string;
  mimetype: string;
  size?: number;
};
