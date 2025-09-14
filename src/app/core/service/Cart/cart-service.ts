import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Icart } from '../../../Interfaces/cart/icart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private cookie = inject(CookieService);
  itemsNum: BehaviorSubject<number | undefined> = new BehaviorSubject<
    number | undefined
  >(0);

  constructor() {
    this.getUserCart().subscribe({
      next: (res) => {
        this.itemsNum.next(res.numOfCartItems);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string | undefined): Observable<any> {
    return this.http.post(
      `${environment.baseURL}cart`,
      { productId: id },
      {
        headers: { token: this.cookie.get('token') },
      }
    );
  }

  getUserCart(): Observable<any> {
    return this.http.get(`${environment.baseURL}cart`, {
      headers: { token: this.cookie.get('token') },
    });
  }

  updateCart(productId: string, count: number): Observable<any> {
    return this.http.put(
      `${environment.baseURL}cart/${productId}`,
      { count: count },
      {
        headers: { token: this.cookie.get('token') },
      }
    );
  }

  deleteFromCart(productId: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}cart/${productId}`, {
      headers: { token: this.cookie.get('token') },
    });
  }

  clearCart(): Observable<any> {
    return this.http.delete(`${environment.baseURL}cart`, {
      headers: { token: this.cookie.get('token') },
    });
  }
}
