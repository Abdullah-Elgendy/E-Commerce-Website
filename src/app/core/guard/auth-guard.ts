import { CanActivateFn, Router } from '@angular/router';
import { SignInService } from '../service/Auth/SignIn/sign-in-service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  let s_signIn = inject(SignInService);
  let router = inject(Router);
  if (s_signIn.userData.getValue() !== null) {
    return true;
  } else {
    //in older version we could use router.navigate
    //router.navigate['/login'];

    //however in newer versions we will use parseUrl to avoid blank pages
    return router.parseUrl('/login');
  }
};
