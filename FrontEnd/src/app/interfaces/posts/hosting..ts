import { ICreatePost, IPost, IUpdatePost } from './post.';

export interface ICreateHosting extends ICreatePost {
  bedrooms: number;
  bathroom: number;
  vacancy: number;
  serviceArea: boolean;
  kitchen: boolean;
  garden: boolean;
}

export interface IUpdateHosting extends IUpdatePost {
  bedrooms?: number;
  bathroom?: number;
  vacancy?: number;
  serviceArea?: boolean;
  kitchen?: boolean;
  garden?: boolean;
}

export interface IHosting extends IPost {
  bedrooms: number;
  bathroom: number;
  vacancy: number;
  serviceArea: boolean;
  kitchen: boolean;
  garden: boolean;
}
