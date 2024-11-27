import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { StorageService } from '../services/storage.service';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router);
  const storage = inject(StorageService);

  if (storage.getItem('token') === undefined) {
    router.navigateByUrl('/login');
  }
  return true;
};
