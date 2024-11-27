import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { apiUrl } from './variables';
import { Observable } from 'rxjs';
import { ICreateImage, IDeleteImage } from '../interfaces/posts/post.';
import {
  ICreateHosting,
  IHosting,
  IUpdateHosting,
} from '../interfaces/posts/hosting.';
import {
  ICreateFeeding,
  IFeeding,
  IUpdateFeeding,
} from '../interfaces/posts/feeding.';
import { ICreateEvent, IEvent, IUpdateEvent } from '../interfaces/posts/event.';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private readonly apiUrl = apiUrl;

  constructor(
    private readonly http: HttpClient,
    private readonly storageService: StorageService
  ) {}

  addImagePost(
    imageRQ: ICreateImage
  ): Observable<
    | { message: string }
    | { conflict: boolean; message: string; status: number }
    | string
  > {
    const token = this.storageService.getItem('token');

    if (token === null)
      return new Observable((observer) => observer.next('sem token'));

    const formData = new FormData();
    formData.append('file', imageRQ.file);
    formData.append('id', imageRQ.id.toString());

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      contentType: 'multipart/form-data',
    });

    return new Observable((observer) => {
      this.http
        .post<void>(`${this.apiUrl}/upload/user/image`, formData, { headers })
        .subscribe({
          next: () => {
            observer.next();
          },
          error: (error) => {
            observer.error({
              conflict: false,
              message: error.message,
              status: error.status,
            });
          },
        });
    });
  }

  deleteImagePost(imageRQ: IDeleteImage): Observable<string> {
    const token = this.storageService.getItem('token');

    if (token === null)
      return new Observable((observer) => observer.next('sem token'));

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return new Observable((observer) => {
      this.http
        .delete<void>(`${this.apiUrl}/delete/user/image`, {
          headers,
          body: imageRQ,
        })
        .subscribe({
          next: () => {
            observer.complete();
          },
          error: (error) => {
            observer.error({
              conflict: false,
              message: error.message,
              status: error.status,
            });
          },
        });
    });
  }

  getAllPosts(
    postType: 'hosting' | 'feeding' | 'event',
    page: number
  ): Observable<IHosting[] | IFeeding[] | IEvent[] | null | string> {
    return new Observable((observer) => {
      switch (postType) {
        case 'hosting':
          this.http
            .get<IHosting[]>(`${this.apiUrl}/get/hostings?page=${page}`)
            .subscribe({
              next: (response) => {
                observer.next(response);
                observer.complete();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
        case 'feeding':
          this.http
            .get<IFeeding[]>(`${this.apiUrl}/get/feedings?page=${page}`)
            .subscribe({
              next: (response) => {
                observer.next(response);
                observer.complete();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
        case 'event':
          this.http
            .get<IEvent[]>(`${this.apiUrl}/get/events?page=${page}`)
            .subscribe({
              next: (response) => {
                observer.next(response);
                observer.complete();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
      }
    });
  }

  getUserPosts(
    postType: 'hosting' | 'feeding' | 'event',
    page: number
  ): Observable<IHosting[] | IFeeding[] | IEvent[] | null | string> {
    const token = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (token === null)
      return new Observable((observer) => observer.next('sem token'));

    return new Observable((observer) => {
      switch (postType) {
        case 'hosting':
          this.http
            .get<IHosting[]>(`${this.apiUrl}/get/user/hostings?page=${page}`, {
              headers,
            })
            .subscribe({
              next: (response) => {
                observer.next(response);
                observer.complete();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
        case 'feeding':
          this.http
            .get<IFeeding[]>(`${this.apiUrl}/get/user/feedings?page=${page}`, {
              headers,
            })
            .subscribe({
              next: (response) => {
                observer.next(response);
                observer.complete();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
        case 'event':
          this.http
            .get<IEvent[]>(`${this.apiUrl}/get/user/events?page=${page}`, {
              headers,
            })
            .subscribe({
              next: (response) => {
                observer.next(response);
                observer.complete();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
      }
    });
  }

  addPost(
    post: ICreateHosting | ICreateFeeding | ICreateEvent,
    postType: 'hosting' | 'feeding' | 'event'
  ): Observable<
    | { message: string }
    | { conflict: boolean; message: string; status: number }
    | string
  > {
    const token = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (token === null)
      return new Observable((observer) => observer.next('sem token'));

    return new Observable((observer) => {
      switch (postType) {
        case 'hosting':
          this.http
            .post<void>(`${this.apiUrl}/create/user/hosting`, post, { headers })
            .subscribe({
              next: () => {
                observer.next();
              },
              error: (error) => {
                console.log("erro api post", error);
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
        case 'feeding':
          this.http
            .post<void>(`${this.apiUrl}/create/user/feeding`, post, { headers })
            .subscribe({
              next: () => {
                observer.next();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
        case 'event':
          this.http
            .post<void>(`${this.apiUrl}/create/user/event`, post, { headers })
            .subscribe({
              next: () => {
                observer.next();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
      }
    });
  }

  updatePost(
    post: IUpdateHosting | IUpdateFeeding | IUpdateEvent,
    postType: 'hosting' | 'feeding' | 'event'
  ): Observable<
    | { message: string }
    | { conflict: boolean; message: string; status: number }
    | string
  > {
    const token = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (token === null)
      return new Observable((observer) => observer.next('sem token'));

    return new Observable((observer) => {
      switch (postType) {
        case 'hosting':
          this.http
            .put<void>(`${this.apiUrl}/update/user/hosting`, post, { headers })
            .subscribe({
              next: () => {
                observer.next();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
        case 'feeding':
          this.http
            .put<void>(`${this.apiUrl}/update/user/feeding`, post, { headers })
            .subscribe({
              next: () => {
                observer.next();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
        case 'event':
          this.http
            .put<void>(`${this.apiUrl}/update/user/event`, post, { headers })
            .subscribe({
              next: () => {
                observer.next();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
      }
    });
  }

  deletePost(
    postType: 'hosting' | 'feeding' | 'event',
    id: string
  ): Observable<
    | { message: string }
    | { conflict: boolean; message: string; status: number }
    | string
  > {
    const token = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (token === null)
      return new Observable((observer) => observer.next('sem token'));

    return new Observable((observer) => {
      switch (postType) {
        case 'hosting':
          this.http
            .delete<void>(`${this.apiUrl}/delete/user/hosting/${id}`, {
              headers,
            })
            .subscribe({
              next: () => {
                observer.next();
              },
              error: (error) => {
                console.log("erro api delete", error);
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
        case 'feeding':
          this.http
            .delete<void>(`${this.apiUrl}/delete/user/feeding/${id}`, {
              headers,
            })
            .subscribe({
              next: () => {
                observer.next();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
        case 'event':
          this.http
            .delete<void>(`${this.apiUrl}/delete/user/event/${id}`, { headers })
            .subscribe({
              next: () => {
                observer.next();
              },
              error: (error) => {
                observer.error({
                  conflict: false,
                  message: error.message,
                  status: error.status,
                });
              },
            });
          break;
      }
    });
  }
}
