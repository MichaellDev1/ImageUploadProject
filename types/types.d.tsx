import { Key, ReactNode } from "react";

export interface LayoutPagesInterface {
  children: ReactNode;
  title: string;
}

export interface Comment {
  id_user?: string;
  isVerified: boolean;
  username?: string;
  image: string;
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
  username: string;
  isVerified: boolean;
  likes: Array<string>;
  title: string;
  image: string;
  description: string;
  createdAt: Date;
  _id: string;
  pathImageUser: string;
  updatedAt: Date;
}

export interface Porfile {
  image: string;
  username: string;
  verified: boolean;
  _id: string;
  followers: number;
  inARow: number;
}

export interface PorfileUser {
  porfileUser: {
    porfile: Porfile;
    posts: Array<Post>;
  };
}
