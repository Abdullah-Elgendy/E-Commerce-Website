import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { SignInService } from '../Auth/SignIn/sign-in-service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cookie = inject(CookieService);
  private s_signin = inject(SignInService);
  itemsNum: BehaviorSubject<number | undefined> = new BehaviorSubject<
    number | undefined
  >(0);

  constructor() {
    if (this.cookie.get('token')) {
      this.getUserCart().subscribe({
        next: (res) => {
          this.itemsNum.next(res.numOfCartItems);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  //Note that we used the setHeader interceptor to send the 'token' in the header in these functions:

  addToCart(id: string | undefined): Observable<any> {
    return this.http.post(`${environment.baseURL}cart`, { productId: id });
  }

  getUserCart(): Observable<any> {
    return this.http.get(`${environment.baseURL}cart`);
    {
    }
  }

  updateCart(productId: string, count: number): Observable<any> {
    return this.http.put(`${environment.baseURL}cart/${productId}`, {
      count: count,
    });
  }

  deleteFromCart(productId: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}cart/${productId}`);
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${environment.baseURL}cart`);
  }
}
