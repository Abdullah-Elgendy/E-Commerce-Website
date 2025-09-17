import { Component, inject, OnInit } from '@angular/core';
import { SignInService } from '../../core/service/Auth/SignIn/sign-in-service';
import { Ordersservice } from '../../core/service/Orders/ordersservice';

@Component({
  selector: 'app-allorders',
  imports: [],
  templateUrl: './allorders.html',
  styleUrl: './allorders.scss',
})
export class Allorders implements OnInit {
  private s_signIn = inject(SignInService);
  private s_orders = inject(Ordersservice);

  getOrders() {
    this.s_orders
      .getUserOrders(this.s_signIn.userData.getValue()?.id)
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  ngOnInit(): void {
    this.getOrders();
  }
}
