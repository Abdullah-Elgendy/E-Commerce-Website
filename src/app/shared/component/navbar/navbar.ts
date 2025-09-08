import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { FlowbiteService } from '../../../core/service/Flowbite/flowbite-service';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { SignInService } from '../../../core/service/Auth/SignIn/sign-in-service';
import { CartService } from '../../../core/service/Cart/cart-service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  @ViewChild('light') light!: ElementRef;
  @ViewChild('dark') dark!: ElementRef;
  mode!: String;
  isLoggedIn!: Boolean;
  cartItemNum!: number | undefined;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private flowbiteService: FlowbiteService,
    private s_signIn: SignInService,
    private s_cart: CartService
  ) {
    //determines the color theme
    if (isPlatformBrowser(platformId)) {
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.mode = 'dark';
      } else {
        this.mode = 'light';
      }
    }
  }

  ngOnInit(): void {
    this.s_signIn.userData.subscribe({
      next: (res) => {
        if (res !== null) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }
      },
      error: (err) => {
        console.log('Error', err);
      },
    });

    this.s_cart.itemsNum.subscribe({
      next: (res) => {
        this.cartItemNum = res;
      },
    });

    this.flowbiteService.loadFlowbite((flowbite) => {
      flowbite.initFlowbite();
    });
  }

  //toggles dark or light icon when clicked
  toggleMode() {
    this.light.nativeElement.classList.toggle('fa-solid');
    this.dark.nativeElement.classList.toggle('fa-solid');
    document.documentElement.classList.toggle('dark');
  }

  logOut() {
    this.s_signIn.deleteData();
  }
}
