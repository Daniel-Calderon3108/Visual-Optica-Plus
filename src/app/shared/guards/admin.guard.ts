import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated() && authService.isAdmin()) {
    return true;
  }

  // Redirigir al login o a welcome si no es admin
  if (!authService.isAuthenticated()) {
    router.navigate(['/login']);
  } else {
    router.navigate(['/welcome']);
  }
  return false;
};

