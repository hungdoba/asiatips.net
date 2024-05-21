import { jlpt_mondai, jlpt_question } from '@prisma/client';

export interface MondaiComponentProps {
  mondais: jlpt_mondai[];
  questions: jlpt_question[];
  onOptionSelect: (question_number: number, optionNumber: number) => void;
  selectedOptions?: { [key: number]: number };
}

export interface QuestionComponentProps {
  question: jlpt_question;
  onOptionSelect: (question_number: number, optionNumber: number) => void;
  selectedOptions?: { [key: number]: number };
  showAnswer?: boolean | null;
}

export interface ImageProps {
  id: number;
  height: string;
  width: string;
  public_id: string;
  format: string;
  blurDataUrl?: string;
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
}

export interface PostCreation {
  slug: string;
  category: string;
  tags: string;
  imageUrl: string;
  active: boolean;
  viTitle: string;
  viBrief: string;
  viTableOfContents: string;
  viContent: string;
  jaTitle: string;
  jaBrief: string;
  jaTableOfContents: string;
  jaContent: string;
}
