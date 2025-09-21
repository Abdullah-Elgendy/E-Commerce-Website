import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class Wishlistservice {
  private http = inject(HttpClient);

  addProductToWishlist(id: string): Observable<any> {
    return this.http.post(`${environment.baseURL}wishlist`, {
      productId: id,
    });
  }

  removeProductFromWishlist(id: string): Observable<any> {
    return this.http.delete(`${environment.baseURL}wishlist/${id}`);
  }

  getUserWishlist(): Observable<any> {
    return this.http.get(`${environment.baseURL}wishlist`);
  }
}
