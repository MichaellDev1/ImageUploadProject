import { Key, ReactNode } from "react";

export interface LayoutPagesInterface {
  children: ReactNode;
  title: string;
}

export interface Post {
  comment: Array<object>;
  createdAt: Date;
  description?: string;
  image: string;
  likes: Array<string | null>;
  title?: string;
  updatedAt: Date;
  _id: string | Key;
}
