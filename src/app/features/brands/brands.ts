import { Component, inject, OnInit } from '@angular/core';
import { ProductsAPI } from '../../core/service/ProductsAPI/productsAPI';
import {
  distinctUntilChanged,
  filter,
  find,
  from,
  map,
  of,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-brands',
  imports: [],
  templateUrl: './brands.html',
  styleUrl: './brands.scss',
})
export class Brands {
  private s_products = inject(ProductsAPI);

  getData() {
    this.s_products
      .getAllProducts()
      .pipe(
        map((res: any) => {
          res.results = 200;
          return res;
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
