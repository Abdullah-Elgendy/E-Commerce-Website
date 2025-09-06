import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { ProductsAPI } from '../../core/service/ProductsAPI/productsAPI';
import { Card } from '../../shared/component/card/card';
import { FormsModule, ɵInternalFormsSharedModule } from '@angular/forms';
import { SearchPipe } from '../../shared/pipe/search-pipe';

@Component({
  selector: 'app-products',
  imports: [Card, ɵInternalFormsSharedModule, FormsModule, SearchPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private _productsAPI = inject(ProductsAPI);
  isLoading: Boolean = false;
  inputText: string = '';
  productList: WritableSignal<any> = signal([]);

  getData() {
    this._productsAPI.getAllProducts().subscribe({
      next: (res: any) => {
        console.log(res.data);
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
