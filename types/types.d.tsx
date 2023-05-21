import { Key, ReactNode } from "react";

export interface LayoutPagesInterface {
  children: ReactNode;
  title: string;
}

export interface Comment {
  id_user?: string;
  isVerified: boolean;
  username?: string;
  comment?: string;
}

export interface UserInterface {
  favorite: Array<string>;
  image: string;
  verified: boolean;
  username: string;
  _id: string;
  token: string;
}

export interface Post {
  comment: Array<Comment>;
  createdAt: Date | string;
  description?: string;
  image: string;
  likes: Array<string | null>;
  title?: string;
  updatedAt: Date | string;
  isVerified: boolean;
  id_user: string;
  pathImageUser: string;
  username: string;
  _id: string | Key;
}

export interface Porfile {
  image: string;
  username: string;
  verified: boolean;
  _id: string;
}

export interface PorfileUser {
  porfileUser: {
    porfile: Porfile;
    posts: Array<Post>;
  };
}
