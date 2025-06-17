import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { map } from 'rxjs';

export const roleGuard: CanActivateFn = (route, state) => {
  const authService = inject (AuthService);

return authService.authUser$.pipe(
  map((user) => Boolean(user && user.role === 'admin'))
);
}