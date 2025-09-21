import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, throwError } from 'rxjs';

export const handleErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const s_toast = inject(ToastrService);

  //after the response comes back from next(req)
  return next(req).pipe(
    catchError((err) => {
      s_toast.error(err.error.message, 'Error');
      return throwError(() => {
        return err;
      });
    })
  );
};
