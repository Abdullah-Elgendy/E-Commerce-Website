import { CanActivateFn, Router } from '@angular/router';
import { CartService } from '../service/Cart/cart-service';
import { inject } from '@angular/core';

export const shippingGuard: CanActivateFn = (route, state) => {
  let s_cart = inject(CartService);
  let router = inject(Router);
  if (s_cart.itemsNum.value === 0) {
    return router.parseUrl('/cart');
  } else {
    return true;
  }
};
