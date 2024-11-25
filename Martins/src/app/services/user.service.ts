import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { apiUrl } from './variables';
import {
  IUserLoginRQ,
  IUserCreateRQ,
  IUserLoginRP,
  IUserUpdateRQ,
} from '../interfaces/user.';
import { Router } from '@angular/router';
import { formatDate, isPlatformBrowser } from '@angular/common';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly apiUrl = apiUrl;
  private readonly router = new Router();
  private readonly isBrowser: boolean;

  constructor(
    private readonly http: HttpClient,
    @Inject(PLATFORM_ID) private readonly platformId: Object,
    private readonly storageService: StorageService
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  create(user: IUserCreateRQ): Observable<void> {
    return new Observable((observer) => {
      this.http.post<any>(`${this.apiUrl}/create`, user).subscribe({
        next: () => {
          this.router.navigate(['/login']);
          observer.complete();
        },
        error: (error) => {
          observer.error({ conflict: false, message: error.error.message });
        },
      });
    });
  }

  login(user: IUserLoginRQ): Observable<void> {
    return new Observable((observer) => {
      this.http.post<any>(`${this.apiUrl}/login`, user).subscribe({
        next: (response: IUserLoginRP) => {
          this.storageService.setItem('token', response.token);
          this.storageService.setItem('name', response.name);
          this.storageService.setItem('email', response.email);
          this.storageService.setItem(
            'createdAt',
            formatDate(response.createdAt, "dd-MM-yyyy' 'HH:mm", 'en-US')
          );

          this.router.navigate(['/']);
          observer.complete();
        },
        error: (error) => {
          if (error.status === 404) {
            observer.error({
              conflict: true,
              message: 'Usuário não encontrado',
              status: 404,
            });
          } else if (error.status === 401) {
            observer.error({
              conflict: true,
              message: 'Senha inválIda',
              status: 401,
            });
          } else {
            console.error('Register failed', error);
            observer.error({ conflict: false, message: 'login failed' });
          }
        },
      });
    });
  }

  update(user: IUserUpdateRQ): Observable<void> {
    return new Observable((observer) => {
      this.http.put<any>(`${this.apiUrl}/update/user`, user).subscribe({
        next: () => {
          this.router.navigate(['/']);
          observer.complete();
        },
        error: (error) => {
          console.error('Update failed', error);
          observer.error({ conflict: false, message: 'update failed' });
        },
      });
    });
  }

  logout(): void {
    if (this.isBrowser) {
      this.storageService.removeItem('token');
      this.storageService.removeItem('name');
      this.storageService.removeItem('email');
      this.storageService.removeItem('createdAt');
    }
  }

  isLogged(): boolean {
    if (this.isBrowser) {
      return !!this.storageService.getItem('token');
    }
    return false;
  }
}
