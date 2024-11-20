export interface ICreatePost {
  title: string;
  location: string;
  phone?: string;
  instagram?: string;
  description?: string;
}

export interface IUpdatePost {
  id: number;
  title?: string;
  location?: string;
  phone?: string;
  instagram?: string;
  description?: string;
}

export interface IPost {
  id: string;
  title: string;
  location: string;
  phone: string;
  instagram: string;
  classification: number;
  description: string;
  images: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface ICreateImage {
  file: File;
  id: string;
}

export interface IDeleteImage {
  id: string;
  path: string;
}
