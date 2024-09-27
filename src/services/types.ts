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

export type FormMeta = {
  id: string;
  name: string;
  duration?: number;
  questionNum?: number;
};

export type Toefl = {
  id: string;
  name: string;
  description?: string;
  premium: boolean;
  instruction?: string;
  closing?: string;
  publishedAt?: string;
  readingSection: FormMeta;
  listeningSection: FormMeta;
  grammarSection: FormMeta;
};

export type Eval = {
  id: string;
  questionNum?: number;
  correctAnswerNum?: number;
  attempt: Attempt;
};

export type ToeflEval = {
  id: string;
  toefl: Toefl;
  readingEval?: Eval;
  listeningEval?: Eval;
  grammarEval?: Eval;
  totalScore?: number;
  maxScore?: number;
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
  order: number;
};

export type Question = {
  id: string;
  text?: string;
  audio?: Storage;
  order: number;
  reference?: Reference;
  readingReferenceDetail?: string;
  part?: Part;
  options?: Option[];
};

export type Key = {
  option?: Option;
  question: Question;
  explanation?: string;
};
export type QuestionAndKey = Question & {
  key?: Key;
};

export type Attempt = {
  endTime?: string;
  startedAt?: string;
  finishedAt?: string;
  canceledAt?: string;
  createdAt?: string;
  remainingTime?: number;
  answers?: Answer[];
};

export type AttemptWithRemainingTime = Attempt & {
  remainingTime?: number;
};

export type Answer = {
  option?: Option;
  question: Question;
};
