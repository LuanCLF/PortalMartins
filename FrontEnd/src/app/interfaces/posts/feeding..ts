import { ICreatePost, IPost, IUpdatePost } from './post.';

export interface ICreateFeeding extends ICreatePost {
  type: string;
  wifi: boolean;
  delivery: boolean;
  parking: boolean;
}

export interface IUpdateFeeding extends IUpdatePost {
  type?: string;
  wifi?: boolean;
  delivery?: boolean;
  parking?: boolean;
}

export interface IFeeding extends IPost {
  type: string;
  wifi: boolean;
  delivery: boolean;
  parking: boolean;
}
