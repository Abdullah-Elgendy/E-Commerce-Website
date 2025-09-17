import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../core/service/Cart/cart-service';
import { CartProduct, Icart } from '../../Interfaces/cart/icart';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router"

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart implements OnInit {
  private s_cart = inject(CartService);
  private s_toast = inject(ToastrService);
  isLoading: boolean = false;
  _cartId!: string | undefined;
  cartProducts: CartProduct[] = [];
  totalPrice: number | undefined = 0;

  getCartProducts() {
    this.isLoading = true;
    this.s_cart.getUserCart().subscribe({
      next: (res: Icart) => {
        this._cartId = res.cartId;
        this.cartProducts = res.data.products;
        this.totalPrice = res.data.totalCartPrice;
        this.s_cart.itemsNum.next(res.numOfCartItems);
        this.isLoading = false;
      },
      error: (err) => {
        this.isLoading = false;
        this.s_toast.success(err.error.message, 'Error');
      },
    });
  }

  removeCartProduct(id: string) {
    this.isLoading = true;
    this.s_cart.deleteFromCart(id).subscribe({
      next: (res) => {
        this.s_toast.success('Product Removed From Cart', 'Success');
        this.getCartProducts();
      },
      error: (err) => {
        this.isLoading = false;
        this.s_toast.success(err.error.message, 'Error');
      },
    });
  }

  updateCartProduct(id: string, count: number) {
    this.s_cart.updateCart(id, count).subscribe({
      next: (res) => {
        this.getCartProducts();
      },
      error: (err) => {
        this.isLoading = false;
        this.s_toast.success(err.error.message, 'Error');
      },
    });
  }

  clearCartProducts() {
    this.isLoading = true;
    this.s_cart.clearCart().subscribe({
      next: (res) => {
        this.s_toast.success('Cart Cleared!', 'Success');
        this.getCartProducts();
      },
      error: (err) => {
        this.isLoading = false;
        this.s_toast.success(err.error.message, 'Error');
      },
    });
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.getCartProducts();
  }
}
