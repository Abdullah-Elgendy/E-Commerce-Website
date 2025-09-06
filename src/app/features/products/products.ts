import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsAPI } from '../../core/service/ProductsAPI/productsAPI';
import { Card } from '../../shared/component/card/card';
import { Loading } from "../../shared/component/loading/loading";

@Component({
  selector: 'app-products',
  imports: [Card, Loading],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private _productsAPI = inject(ProductsAPI);
  isLoading: Boolean = false;

  productList: WritableSignal<any> = signal([]);

  getData() {
    this._productsAPI.getAllProducts().subscribe({
      next: (res: any) => {
        this.productList.set(res.data);
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getData();
  }
}
