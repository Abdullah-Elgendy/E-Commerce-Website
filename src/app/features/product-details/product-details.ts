import {
  AfterViewInit,
  Component,
  ElementRef,
  inject,
  OnInit,
  signal,
  ViewChild,
  WritableSignal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsAPI } from '../../core/service/ProductsAPI/productsAPI';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Loading } from '../../shared/component/loading/loading';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, Loading, CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  private activated = inject(ActivatedRoute);
  private _productsAPI = inject(ProductsAPI);
  productData: WritableSignal<any> = signal({});
  productId!: string | null;
  @ViewChild('productCover') coverImg!: ElementRef;
  isLoading = false;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 3,
      },
    },
    nav: true,
  };

  //get the product id from the url using ActivatedRoute
  getProductID() {
    this.activated.paramMap.subscribe({
      next: (paramUrl) => {
        this.productId = paramUrl.get('id');
      },
    });
  }

  getData() {
    this._productsAPI.getProductById(this.productId).subscribe({
      next: (res: any) => {
        this.isLoading = false;
        this.productData.set(res.data);
      },
      error: (error: any) => {
        this.isLoading = false;
        console.log(error);
      },
    });
  }

  swapImage(url: string) {
    this.coverImg.nativeElement.setAttribute('src', url);
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getProductID();
    this.getData();
  }
}
