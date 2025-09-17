import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Ordersservice } from '../../core/service/Orders/ordersservice';
import { FlowbiteService } from '../../core/service/Flowbite/flowbite-service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/service/Cart/cart-service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cash-order',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './cash-order.html',
  styleUrl: './cash-order.scss',
})
export class CashOrder implements OnInit {
  readonly egyptianCities: string[] = [
    'Cairo',
    'Alexandria',
    'Giza',
    'Shubra El-Kheima',
    'Port Said',
    'Suez',
    'Luxor',
    'El-Mahalla El-Kubra',
    'Tanta',
    'Asyut',
    'Ismailia',
    'Fayyum',
    'Zagazig',
    'Aswan',
    'Damietta',
    'Damanhur',
    'al-Minya',
    'Beni Suef',
    'Qena',
    'Sohag',
    '6th of October City',
    'Shibin El Kom',
    'Baha',
    'Kafr el-Sheikh',
    'Arish',
    'Mallawi',
    '10th of Ramadan City',
    'Bilbais',
    'Marsa Matruh',
    'Idfu',
    'Mit Ghamr',
    'Al-Hamidiyya',
    'Desouk',
    'Qalyub',
    'Abu Kabir',
    'Kafr el-Dawwar',
    'Girga',
    'Akhmim',
    'Matareya',
  ];
  private s_flowbite = inject(FlowbiteService);
  private s_orders = inject(Ordersservice);
  private s_toast = inject(ToastrService);
  private s_cart = inject(CartService);
  private activeRoute = inject(ActivatedRoute);
  private router = inject(Router);

  cartId!: string | null;
  isLoading: boolean = false;
  errorMsg: string = '';

  addressForm = new FormGroup({
    details: new FormControl('', [Validators.required]),
    phone: new FormControl('', [
      Validators.required,
      Validators.pattern(/^(\+2)?01[0125]\d{8}$/),
    ]),
    city: new FormControl('', [Validators.required]),
  });

  submitForm() {
    this.isLoading = true;
    if (this.addressForm.valid) {
      this.s_orders
        .createCashOrder(this.addressForm.value, this.cartId)
        .subscribe({
          next: (res) => {
            this.isLoading = false;
            console.log(res);
            this.s_cart.itemsNum.next(0);
            this.s_toast.success('Order Placed Successfully!', 'Success');
            this.router.navigate(['/allorders']);
          },
          error: (err) => {
            this.isLoading = false;
            this.errorMsg = err.error.message;
            console.log(err);
          },
        });
    } else {
      this.addressForm.markAllAsTouched();
      this.isLoading = false;
    }
  }

  getCartIdFromRoute() {
    let id: string;
    this.activeRoute.paramMap.subscribe({
      next: (res) => {
        this.cartId = res.get('id');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  ngOnInit(): void {
    this.getCartIdFromRoute();
    this.s_flowbite.loadFlowbite((flowbite) => {
      flowbite.initFlowbite();
    });
  }
}
