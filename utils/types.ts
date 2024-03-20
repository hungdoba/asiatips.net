// export enum Language {
//   vi = 'Vietnamese',
//   ja = 'Japanese',
// }

export interface NewArticle {
  url: string;
  category: string;
  imageUrl: string;
  tags: string;
  active: string;
  translate: {
    [language: string]: {
      title: string;
      brief: string;
      tableOfContents: string;
      markdown: string;
    };
  };
}
export interface _NewArticle {
  url: string;
  category: string;
  imageUrl: string;
  tags: string;
  active: string;
  translate: {
    vi: {
      title: string;
      brief: string;
      tableOfContents: string;
      markdown: string;
    };
    ja: {
      title: string;
      brief: string;
      tableOfContents: string;
      markdown: string;
    };
  };
}

// export interface ArticleInfoType {
//   title: string;
//   category: string;
//   url: string;
//   imageUrl: string;
//   tags: string;
//   brief: string;
//   tableOfContent: string;
//   active: string;
// }

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
