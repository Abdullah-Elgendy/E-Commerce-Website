import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsAPI {
  private Http = inject(HttpClient);

  getAllProducts(): Observable<any> {
    return this.Http.get(`${environment.baseURL}products`);
  }

  getProductById(id: string | null): Observable<any> {
    return this.Http.get(`${environment.baseURL}products/${id}`);
  }
}
