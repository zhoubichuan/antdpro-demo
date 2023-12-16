export type Member = {
  images: array;
  name: string;
  id: string;
};

export type CardListItemDataType = {
  id: string;
  owner: string;
  author: string;
  images: array;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  subDescription: string;
  descript: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
};
