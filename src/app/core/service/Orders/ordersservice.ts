import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { environment } from '../../../../environments/environment.development';
import { IShippingAddress } from '../../../Interfaces/checkout/icheck-out';
import { Observable } from 'rxjs';
import { env } from 'process';

@Injectable({
  providedIn: 'root',
})
export class Ordersservice {
  private http = inject(HttpClient);
  private s_cookie = inject(CookieService);

  createCashOrder(
    shippingAddress: Partial<IShippingAddress>,
    cartId: string | null
  ): Observable<any> {
    return this.http.post(
      `${environment.baseURL}orders/${cartId}`,
      { shippingAddress: shippingAddress },
      { headers: { token: this.s_cookie.get('token') } }
    );
  }

  createCheckoutSession(
    shippingAddress: Partial<IShippingAddress>,
    cartId: string | null
  ): Observable<any> {
    return this.http.post(
      `${environment.baseURL}orders/checkout-session/${cartId}?url=${environment.host}`,
      { shippingAddress: shippingAddress },
      {
        headers: {
          token: this.s_cookie.get('token'),
        },
      }
    );
  }

  getUserOrders(userId: string | undefined): Observable<any> {
    return this.http.get(`${environment.baseURL}orders/user/${userId}`);
  }
}
