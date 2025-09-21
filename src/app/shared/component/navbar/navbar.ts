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
import { IPayLoad } from '../../../Interfaces/auth/isign-in';
import { ScrollNav } from '../../directives/scroll-nav';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, ScrollNav],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit {
  @ViewChild('light') light!: ElementRef;
  @ViewChild('dark') dark!: ElementRef;
  mode!: String;
  isLoggedIn!: Boolean;
  user!: IPayLoad | null;
  cartItemNum!: number | undefined;

  constructor(
    @Inject(PLATFORM_ID) platformId: Object,
    private flowbiteService: FlowbiteService,
    private s_signIn: SignInService,
    private s_cart: CartService
  ) {
    //determines the color theme
    if (isPlatformBrowser(platformId)) {
      if (localStorage.getItem('theme') === 'dark') {
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
          this.user = res;
        } else {
          this.isLoggedIn = false;
          this.user = null;
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
    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
    }
  }

  logOut() {
    this.s_signIn.deleteData();
  }
}
