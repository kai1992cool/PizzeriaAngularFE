import {CanMatchFn, RedirectCommand, Router} from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';


export const userCredentialsGuard: CanMatchFn = (route, segments) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const userCredentials = authService.getUserCredentials();
  if (userCredentials.userId !== null && userCredentials.userEmail !== null) {
    return true;
  } else {
    return new RedirectCommand(router.parseUrl("/acceso-denegado"));
  }
};
