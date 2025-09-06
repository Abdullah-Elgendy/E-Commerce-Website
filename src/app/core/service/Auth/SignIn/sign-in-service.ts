import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ISignIn } from '../../../../Interfaces/auth/isign-in';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class SignInService {
  // in case we are using localstorage with token, we will use platformID

  // constructor(@Inject(PLATFORM_ID) platformId: object) {
  //   if (isPlatformBrowser(platformId)) {
  //     if (localStorage.getItem('token') !== null) {
  //       this.decodeToken();
  //     }
  //   }
  // }

  //in case we are using cookies, we don't need platformID

  constructor() {
    if (this.s_cookie.get('token')) {
      this.decodeToken();
    }
  }

  private router = inject(Router);
  private s_cookie = inject(CookieService);
  private http = inject(HttpClient);
  userData: BehaviorSubject<null | JwtPayload> =
    new BehaviorSubject<null | JwtPayload>(null);

  signInData(payload: ISignIn | any): Observable<any> {
    return this.http.post(`${environment.baseURL}auth/signin`, payload);
  }

  decodeToken() {
    //get token using cookie, can also use localstorage
    // const token: string = localStorage.getItem('token')!;
    const token: string = this.s_cookie.get('token');
    const decoded = jwtDecode(token);
    this.userData.next(decoded);
  }

  deleteData() {
    //remove token using cookie, can also use localstorage
    // localStorage.removeItem('token');
    this.s_cookie.delete('token');
    //set userdata to null
    this.userData.next(null);
    //navigate to login page
    this.router.navigate(['/login']);
  }
}
