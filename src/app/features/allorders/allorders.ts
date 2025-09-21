import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { SignInService } from '../../core/service/Auth/SignIn/sign-in-service';
import { Ordersservice } from '../../core/service/Orders/ordersservice';
import { RouterLink } from '@angular/router';
import { IAllOrders } from '../../Interfaces/allorders/allorders';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { CartProduct } from '../../Interfaces/cart/icart';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-allorders',
  imports: [RouterLink, DatePipe, CurrencyPipe],
  templateUrl: './allorders.html',
  styleUrl: './allorders.scss',
  animations: [
    trigger('fadeAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [style({ opacity: 0 })]),
    ]),
  ],
})
export class Allorders implements OnInit {
  private s_signIn = inject(SignInService);
  private s_orders = inject(Ordersservice);
  ordersList: WritableSignal<IAllOrders[]> = signal([]);
  numOfOrders!: number;
  orderId!: number;
  cartItems: CartProduct[] = [];
  isLoading: Boolean = false;

  getOrders() {
    this.isLoading = true;
    this.s_orders
      .getUserOrders(this.s_signIn.userData.getValue()?.id)
      .subscribe({
        next: (res: IAllOrders[]) => {
          this.ordersList.set(res);
          this.numOfOrders = this.ordersList().length;
          this.isLoading = false;
        },
        error: (err) => {
          console.log(err);
          this.isLoading = false;
        },
      });
  }

  viewOrder(items: CartProduct[], id: number) {
    this.orderId = id;
    this.cartItems = items;
  }

  closeOrder() {
    this.cartItems = [];
  }

  ngOnInit(): void {
    this.getOrders();
  }
}
