import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { IHosting } from '../interfaces/posts/hosting.';
import { IFeeding } from '../interfaces/posts/feeding.';
import { IEvent } from '../interfaces/posts/event.';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  setItem(key: string, value: string): void {
    if (this.isBrowser) {
      localStorage.setItem(key, value);
    }
  }

  getItem(key: string): string | null {
    if (this.isBrowser) {
      return localStorage.getItem(key);
    }
    return null;
  }

  removeItem(key: string): void {
    if (this.isBrowser) {
      localStorage.removeItem(key);
    }
  }

  setPost(key: string, value: IHosting[] | IFeeding[] | IEvent[]): void {
    if (this.isBrowser) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }

  getPost(key: string): IHosting[] | IFeeding[] | IEvent[] | undefined {
    if (this.isBrowser) {
      const item = localStorage.getItem(key);
      if (item) {
        if (key === 'host') return JSON.parse(item) as IHosting[];
        if (key === 'feed') return JSON.parse(item) as IFeeding[];
        if (key === 'event') return JSON.parse(item) as IEvent[];
      }
    }

    return undefined;
  }
}
