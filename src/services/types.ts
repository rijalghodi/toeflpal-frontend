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
  instructionAudio: Storage | null;
  closing: string | null;
  closingAudio: Storage | null;
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

export type Storage = {
  id: string;
  url: string;
  filename?: string;
  originalFilename?: string;
  mimetype: string;
  size?: number;
};

export type Part = {
  id: string;
  name?: string;
  order: number;
  instruction?: string;
  instructionAudio?: Storage;
  closing?: string;
  closingAudio?: Storage;
};

export type Reference = {
  id: string;
  name?: string;
  text?: string;
  audio?: Storage;
};

export type Option = {
  id: string;
  text?: string;
};

export type Question = {
  id: string;
  text?: string;
  audio?: Storage;
  order: number;
  reference?: Reference;
  part?: Part;
  options?: Option[];
};
