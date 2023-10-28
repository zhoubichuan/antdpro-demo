export type Member = {
  avatar: string;
  name: string;
  id: string;
};

export interface Params {
  current: number;
  pageSize: number;
}
export interface ListItemDataType {
  id: string;
  owner: string;
  name: string;
  images: any;
  cover: string;
  status: 'normal' | 'exception' | 'active' | 'success';
  percent: number;
  logo: string;
  href: string;
  body?: any;
  updatedAt: number;
  createdAt: number;
  descript: string;
  description: string;
  activeUser: number;
  newUser: number;
  star: number;
  like: number;
  message: number;
  content: string;
  members: Member[];
}
