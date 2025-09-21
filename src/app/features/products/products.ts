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
import {
  Data,
  DataList,
  IAllProducts,
} from '../../Interfaces/products/iproducts';
import { FlowbiteService } from '../../core/service/Flowbite/flowbite-service';
import { IWishList } from '../../Interfaces/wishlist/wishlist';
import { CookieService } from 'ngx-cookie-service';
import { Wishlistservice } from '../../core/service/Wishlist/wishlistservice';

@Component({
  selector: 'app-products',
  imports: [Card, ɵInternalFormsSharedModule, FormsModule, SearchPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private _productsAPI = inject(ProductsAPI);
  private s_flowbite = inject(FlowbiteService);
  inputText: string = '';
  productList: WritableSignal<DataList[]> = signal([]);
  private s_cookie = inject(CookieService);
  s_wishlist = inject(Wishlistservice);
  list: Data[] = [];

  getData() {
    this._productsAPI.getAllProducts().subscribe({
      next: (res: IAllProducts) => {
        this.productList.set(res.data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getList() {
    if (this.s_cookie.get('token')) {
      this.s_wishlist.getUserWishlist().subscribe({
        next: (res: IWishList) => {
          this.list = res.data;
        },
      });
    }
  }

  ngOnInit(): void {
    this.getData();
    this.getList();
    this.s_flowbite.loadFlowbite((flowbite) => {
      flowbite.initFlowbite();
    });
  }
}
