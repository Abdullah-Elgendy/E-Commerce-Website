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
import { ISpecificProduct, Data } from '../../Interfaces/products/iproducts';
import { IWishList } from '../../Interfaces/wishlist/wishlist';
import { CookieService } from 'ngx-cookie-service';
import { Wishlistservice } from '../../core/service/Wishlist/wishlistservice';

@Component({
  selector: 'app-product-details',
  imports: [CarouselModule, CurrencyPipe],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails implements OnInit{
  private activated = inject(ActivatedRoute);
  private _productsAPI = inject(ProductsAPI);
  private s_cart = inject(CartService);
  private s_toastr = inject(ToastrService);
  private s_cookie = inject(CookieService);
  private s_wishlist = inject(Wishlistservice);
  productData: WritableSignal<Data> = signal({} as Data);
  productId!: string | null;
  favorite: boolean = false;
  @ViewChild('productCover') coverImg!: ElementRef;
  @ViewChild('wishlistEl') wishlistEl!: ElementRef;
  isLoading: boolean = false;
  list: Data[] = [];

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
        this.getData(this.productId);
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
      },
    });
  }

  addToWishlist(id: string) {
    if (!this.favorite) {
      this.s_wishlist.addProductToWishlist(id).subscribe({
        next: (res) => {
          this.s_toastr.success(res.message, 'Success');
          this.favorite = true;
        },
      });
    } else if (this.favorite) {
      this.s_wishlist.removeProductFromWishlist(id).subscribe({
        next: (res) => {
          this.s_toastr.success(
            'Product removed successfully from your wishlist',
            'Success'
          );
          this.favorite = false;
        },
      });
    }
    this.wishlistEl.nativeElement.classList.toggle('fa-solid');
    this.wishlistEl.nativeElement.classList.toggle('fa-regular');
    this.wishlistEl.nativeElement.classList.toggle('text-red-500');
  }

  getData(id: string | null) {
    this._productsAPI.getProductById(id).subscribe({
      next: (res: ISpecificProduct) => {
        this.productData.set(res.data);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  getList() {
    if (this.s_cookie.get('token')) {
      this.s_wishlist.getUserWishlist().subscribe({
        next: (res: IWishList) => {
          this.list = res.data;
          //if the product id is in the wishList then its favorited
          if (
            this.list?.some((product) => product.id === this.productData().id)
          ) {
            this.favorite = true;
          }
        },
      });
    }
  }

  swapImage(url: string) {
    this.coverImg.nativeElement.setAttribute('src', url);
  }

  ngOnInit(): void {
    this.getProductID();
    this.getList();
  }
}
