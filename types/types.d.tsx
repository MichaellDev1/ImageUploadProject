import { Key, ReactNode } from "react";

export interface LayoutPagesInterface {
  children: ReactNode;
  title: string;
}

export interface Post {
  comment: Array<object>;
  createdAt: Date | string;
  description?: string;
  image: string;
  likes: Array<string | null>;
  title?: string;
  updatedAt: Date | string;
  id_user: string;
  pathImageUser: string;
  username: string;
  _id: string | Key;
}
