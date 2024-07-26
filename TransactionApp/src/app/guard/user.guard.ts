import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const userGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService)
  const router = inject(Router)
  if (authService.userData.getValue()?.role == "user") {
    return true
  } else {
    router.navigate(['/login'])
    return false
  }
};
