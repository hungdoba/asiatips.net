import { jlpt_chokai, jlpt_mondai, jlpt_question } from '@prisma/client';

export interface QuestionChokaiComponentProps {
  chokai: jlpt_chokai;
  onOptionSelect: (
    mondaiNumber: number,
    questionNumber: number,
    optionNumber: number
  ) => void;
  selectedOptions?: { [key: number]: number };
  initialShowAnswer?: boolean;
  showHint?: boolean;
  showScript?: boolean;
  showBookmark?: boolean;
  showAllAnswer?: boolean;
  showButtonScript?: boolean;
}

export interface ChokaiComponentProps {
  chokais: jlpt_chokai[];
  onOptionSelect: (
    mondaiNumber: number,
    questionNumber: number,
    optionNumber: number
  ) => void;
  selectedOptions?: { [key: number]: number };
  initialShowAnswer?: boolean;
  showHint?: boolean;
  showBookmark?: boolean;
  showAllAnswer?: boolean;
  showButtonScript?: boolean;
}

export interface MondaiComponentProps {
  mondais: jlpt_mondai[];
  questions: jlpt_question[];
  onOptionSelect: (questionNumber: number, optionNumber: number) => void;
  selectedOptions?: { [key: number]: number };
  showHint?: boolean;
  showBookmark?: boolean;
  showAllAnswer?: boolean;
}

export interface QuestionComponentProps {
  question: jlpt_question;
  onOptionSelect: (questionNumber: number, optionNumber: number) => void;
  selectedOptions?: { [key: number]: number };
  initialShowAnswer?: boolean;
  showHint?: boolean;
  showBookmark?: boolean;
  showAllAnswer?: boolean;
}

export interface SettingFormProps {
  score: number;
  onShowHint: (showHint: boolean) => void;
  onShowBookmark: (showBookmark: boolean) => void;
  onShowAllAnswer: (showAllAnswer: boolean) => void;
  onShowLastChosen: (showLastChosen: boolean) => void;
}

export interface SettingChokaiFormProps {
  score: number;
  totalScore: number;
  onShowHint: (showHint: boolean) => void;
  onShowBookmark: (showBookmark: boolean) => void;
  onShowAllAnswer: (showAllAnswer: boolean) => void;
  onShowLastChosen: (showLastChosen: boolean) => void;
  onShowButtonScript: (showButtonScript: boolean) => void;
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
