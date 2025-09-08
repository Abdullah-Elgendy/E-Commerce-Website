import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { Observable } from 'rxjs';
import {
  IAllProducts,
  ISpecificProduct,
} from '../../../Interfaces/products/iproducts';

@Injectable({
  providedIn: 'root',
})
export class ProductsAPI {
  private Http = inject(HttpClient);

  getAllProducts(): Observable<Partial<IAllProducts>> {
    return this.Http.get(`${environment.baseURL}products`);
  }

  getProductById(id: string | null): Observable<Partial<ISpecificProduct>> {
    return this.Http.get(`${environment.baseURL}products/${id}`);
  }
}
