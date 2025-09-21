import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { Wishlistservice } from '../../core/service/Wishlist/wishlistservice';
import { IWishList } from '../../Interfaces/wishlist/wishlist';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/service/Cart/cart-service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  imports: [RouterLink],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.scss',
})
export class Wishlist implements OnInit {
  private s_wishlist = inject(Wishlistservice);
  private s_toast = inject(ToastrService);
  private s_cart = inject(CartService);
  wishList: WritableSignal<IWishList> = signal({} as IWishList);
  isLoading: boolean = false;

  getWishlist() {
    this.isLoading = true;
    this.s_wishlist.getUserWishlist().subscribe({
      next: (res: IWishList) => {
        this.wishList.set(res);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  removeFromList(id: string) {
    this.isLoading = true;
    this.s_wishlist.removeProductFromWishlist(id).subscribe({
      next: (res) => {
        this.s_toast.success(
          'Product removed successfully from your wishlist',
          'Success'
        );
        this.getWishlist();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  addToCart(id: string) {
    this.isLoading = true;
    this.s_cart.addToCart(id).subscribe({
      next: (res) => {
        this.s_toast.success(res.message, 'Success');
        this.s_cart.itemsNum.next(res.numOfCartItems);
        this.isLoading = false;
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  ngOnInit(): void {
    this.getWishlist();
  }
}
