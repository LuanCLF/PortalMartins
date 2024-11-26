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
        .post<any>(`${this.apiUrl}/upload/user/image`, formData, { headers })
        .subscribe({
          next: (response) => {
            observer.next(response);
          },
          error: (error) => {
            console.log(error);
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
        .delete<any>(`${this.apiUrl}/delete/user/image`, {
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

  getAllHostings(page: number): Observable<IHosting[] | null | string> {
    return new Observable((observer) => {
      this.http.get<any>(`${this.apiUrl}/get/hostings?page=${page}`).subscribe({
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
    });
  }

  getAllFeedings(page: number): Observable<IFeeding[] | null | string> {
    return new Observable((observer) => {
      this.http.get<any>(`${this.apiUrl}/get/feedings?page=${page}`).subscribe({
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
    });
  }

  getAllEvents(page: number): Observable<IEvent[] | null | string> {
    return new Observable((observer) => {
      this.http.get<any>(`${this.apiUrl}/get/events?page=${page}`).subscribe({
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
    });
  }

  getHostings(page?: number): Observable<IHosting[] | null | string> {
    const token = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (token === null)
      return new Observable((observer) => observer.next('sem token'));

    return new Observable((observer) => {
      this.http
        .get<any>(`${this.apiUrl}/get/user/hostings?page=${page ? page : 1}`, {
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
    });
  }

  getFeeding(page?: number): Observable<IFeeding[] | null | string> {
    const token = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (token === null)
      return new Observable((observer) => observer.next('sem token'));

    return new Observable((observer) => {
      this.http
        .get<any>(`${this.apiUrl}/get/user/feedings?page=${page ? page : 1}`, {
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
    });
  }

  getEvents(page?: number): Observable<IEvent[] | null | string> {
    const token = this.storageService.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    if (token === null)
      return new Observable((observer) => observer.next('sem token'));

    return new Observable((observer) => {
      this.http
        .get<any>(`${this.apiUrl}/get/user/events?page=${page ? page : 1}`, {
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
    });
  }

  addPost(
    post: ICreateHosting | ICreateFeeding | ICreateEvent,
    postType: string
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
            .post<any>(`${this.apiUrl}/create/user/hosting`, post, { headers })
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
            .post<any>(`${this.apiUrl}/create/user/feeding`, post, { headers })
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
            .post<any>(`${this.apiUrl}/create/user/event`, post, { headers })
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

  addHostPost(
    data: ICreateHosting
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
      this.http
        .post<any>(`${this.apiUrl}/create/user/hosting`, data, { headers })
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
    });
  }

  addFeedingPost(
    data: ICreateFeeding
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
      this.http
        .post<any>(`${this.apiUrl}/create/user/feeding`, data, { headers })
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
    });
  }

  addEventPost(
    data: ICreateEvent
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
      this.http
        .post<any>(`${this.apiUrl}/create/user/event`, data, { headers })
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
    });
  }

  updateHostPost(
    data: IUpdateHosting
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
      this.http
        .put<any>(`${this.apiUrl}/update/user/hosting`, data, { headers })
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
    });
  }

  updateFeedingPost(
    data: IUpdateFeeding
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
      this.http
        .put<any>(`${this.apiUrl}/update/user/feeding`, data, { headers })
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
    });
  }

  updateEventPost(
    data: IUpdateEvent
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
      this.http
        .put<any>(`${this.apiUrl}/update/user/event`, data, { headers })
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
    });
  }

  deleteHostPost(
    Id: string
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
      this.http
        .delete<any>(`${this.apiUrl}/delete/user/hosting/${Id}`, { headers })
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
    });
  }

  deleteFeedingPost(
    Id: string
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
      this.http
        .delete<any>(`${this.apiUrl}/delete/user/feeding/${Id}`, { headers })
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
    });
  }

  deleteEventPost(
    Id: string
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
      this.http
        .delete<any>(`${this.apiUrl}/delete/user/event/${Id}`, { headers })
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
    });
  }
}
