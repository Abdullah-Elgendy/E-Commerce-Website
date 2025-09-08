import { CurrencyPipe } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../../core/service/Cart/cart-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-card',
  imports: [RouterLink, CurrencyPipe],
  templateUrl: './card.html',
  styleUrl: './card.scss',
})
export class Card {
  private s_cart = inject(CartService);
  private s_toastr = inject(ToastrService);
  isLoading: boolean = false;

  @Input() productData: any;

  addProductToCart(id: string) {
    this.isLoading = true;
    this.s_cart.addToCart(id).subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        this.s_toastr.success(res.message, 'Success');
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
        this.s_toastr.error(err.error.message, 'Error');
      },
    });
  }
}
