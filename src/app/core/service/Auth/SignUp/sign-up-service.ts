import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment.development';
import { ISignUp } from '../../../../Interfaces/auth/isign-up';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
  private http = inject(HttpClient);

  registerData(payload: ISignUp | any): Observable<any> {
    return this.http.post(`${environment.baseURL}auth/signup`, payload);
  }
}
