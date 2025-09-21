import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';

import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const setHeaderInterceptor: HttpInterceptorFn = (req, next) => {
  let s_router = inject(Router);
  const s_cookie = inject(CookieService);
  //clone the request
  req = req.clone({
    setHeaders: {
      token: s_cookie.get('token'),
    },
  });

  return next(req);
};
