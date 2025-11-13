import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth/auth';

/**
 * Guard que previene que usuarios autenticados accedan a páginas de invitados (login, register)
 * Redirige a usuarios autenticados a la página principal
 */
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    // Si el usuario ya está autenticado, redirigir a welcome
    router.navigate(['/welcome']);
    return false;
  }

  // Si no está autenticado, permitir acceso a páginas de invitados
  return true;
};

