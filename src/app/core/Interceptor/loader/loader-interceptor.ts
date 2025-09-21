import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinner, NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  const s_spinner = inject(NgxSpinnerService);
  const s_router = inject(Router);
  if (
    !(
      s_router.url.includes('cart') ||
      s_router.url.includes('allorders') ||
      s_router.url.includes('wishlist')
    )
  ) {
    s_spinner.show();
    return next(req).pipe(
      finalize(() => {
        s_spinner.hide();
      })
    );
  } else {
    return next(req);
  }
};
