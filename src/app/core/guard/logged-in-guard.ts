import { CanActivateFn, Router } from '@angular/router';
import { SignInService } from '../service/Auth/SignIn/sign-in-service';
import { inject } from '@angular/core';

export const loggedInGuard: CanActivateFn = (route, state) => {
  let s_signIn = inject(SignInService);
  let router = inject(Router);

  if (s_signIn.userData.getValue() !== null) {
    return router.parseUrl('/home');
  } else {
    return true;
  }
};
