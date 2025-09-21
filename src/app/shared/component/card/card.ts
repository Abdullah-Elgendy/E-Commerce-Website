import { CurrencyPipe } from '@angular/common';
import {
  Component,
  ElementRef,
  inject,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/service/Cart/cart-service';
import { ToastrService } from 'ngx-toastr';
import { Data, DataList } from '../../../Interfaces/products/iproducts';
import { Wishlistservice } from '../../../core/service/Wishlist/wishlistservice';
import { CookieService } from 'ngx-cookie-service';
import { IWishList } from '../../../Interfaces/wishlist/wishlist';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card implements OnChanges {
  private s_cart = inject(CartService);
  private s_toastr = inject(ToastrService);
  private s_wishlist = inject(Wishlistservice);
  private s_toast = inject(ToastrService);
  isLoading: boolean = false;
  favorite: boolean = false;
  @ViewChild('wishListEl') wishlistEl!: ElementRef;
  @Input() productData!: DataList;
  @Input() wishList: Data[] = [];

  addProductToCart(id: string) {
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
          this.s_toast.success(res.message, 'Success');
          this.favorite = true;
        },
      });
    } else if (this.favorite) {
      this.s_wishlist.removeProductFromWishlist(id).subscribe({
        next: (res) => {
          this.s_toast.success(
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wishList'] && changes['wishList'].currentValue) {
      //if the product id is in the wishList then its favorited
      if (
        this.wishList?.some((product) => product.id === this.productData.id)
      ) {
        this.favorite = true;
      }
    }
  }
}
