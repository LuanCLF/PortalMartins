import { ICreatePost, IPost, IUpdatePost } from './post.';

export interface ICreateEvent extends ICreatePost {
  eventDate?: string;
  eventLocation?: string;
}

export interface IUpdateEvent extends IUpdatePost {
  eventDate?: Date;
  eventLocation?: string;
}

export interface IEvent extends IPost {
  eventDate: Date;
  eventLocation: string;
}
