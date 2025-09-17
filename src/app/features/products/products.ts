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
import { DataList, IAllProducts } from '../../Interfaces/products/iproducts';
import { FlowbiteService } from '../../core/service/Flowbite/flowbite-service';

@Component({
  selector: 'app-products',
  imports: [Card, ɵInternalFormsSharedModule, FormsModule, SearchPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products implements OnInit {
  private _productsAPI = inject(ProductsAPI);
  private s_flowbite = inject(FlowbiteService)
  inputText: string = '';
  productList: WritableSignal<DataList[]> = signal([]);

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

  ngOnInit(): void {
    this.getData();
    this.s_flowbite.loadFlowbite((flowbite)=>{
      flowbite.initFlowbite();
    })
  }
}
