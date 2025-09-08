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
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/service/Cart/cart-service';
import {
  ISpecificProduct,
  SpecificProductData,
} from '../../Interfaces/products/iproducts';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit {
  private activated = inject(ActivatedRoute);
  private _productsAPI = inject(ProductsAPI);
  private s_cart = inject(CartService);
  private s_toastr = inject(ToastrService);
  productData: WritableSignal<Partial<SpecificProductData>> = signal({});
  productId!: string | null;
  @ViewChild('productCover') coverImg!: ElementRef;
  isLoading: boolean = false;

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

  addProductToCart(id: string | undefined) {
    this.isLoading = true;
    this.s_cart.addToCart(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.s_cart.itemsNum.next(res.numOfCartItems);
        this.s_toastr.success(res.message, 'Success');
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.s_toastr.error(err.error.message, 'Error');
      },
    });
  }

  getData() {
    this._productsAPI.getProductById(this.productId).subscribe({
      next: (res: any) => {
        this.productData.set(res.data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  swapImage(url: string) {
    this.coverImg.nativeElement.setAttribute('src', url);
  }

  ngOnInit(): void {
    this.getProductID();
    this.getData();
  }
}
