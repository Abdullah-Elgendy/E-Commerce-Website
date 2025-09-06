import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import {
  IResetEmail,
  IResetPassword,
  IVerifyCode,
} from '../../../../Interfaces/auth/iresetpassword';

@Injectable({
  providedIn: 'root',
})
export class ResetPasswordService {
  private http = inject(HttpClient);

  sendCodeToEmail(payload: IResetEmail): Observable<any> {
    return this.http.post(
      `${environment.baseURL}auth/forgotPasswords`,
      payload
    );
  }

  VerifyCode(payload: IVerifyCode): Observable<any> {
    return this.http.post(
      `${environment.baseURL}auth/verifyResetCode`,
      payload
    );
  }

  ResetPassword(payload: IResetPassword): Observable<any> {
    return this.http.put(`${environment.baseURL}auth/resetPassword`, payload);
  }
}
