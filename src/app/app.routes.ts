import { Routes } from '@angular/router';
import { Home } from './features/home/home';
import { Login } from './core/auth/login/login';
import { SignUp } from './core/auth/sign-up/sign-up';
import { Products } from './features/products/products';
import { ProductDetails } from './features/product-details/product-details';
import { Categories } from './features/categories/categories';
import { Brands } from './features/brands/brands';
import { Cart } from './features/cart/cart';
import { NotFoundPage } from './features/not-found-page/not-found-page';
import { authGuard } from './core/guard/auth-guard';
import { loggedInGuard } from './core/guard/logged-in-guard';
import { ResetPasswordComponent } from './core/auth/reset-password-component/reset-password-component';
import { CheckOut } from './features/check-out/check-out';
import { shippingGuard } from './core/guard/shipping-guard';
import { CashOrder } from './features/cash-order/cash-order';
import { Allorders } from './features/allorders/allorders';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'login', component: Login, canActivate: [loggedInGuard] },
  { path: 'signup', component: SignUp, canActivate: [loggedInGuard] },
  {
    path: 'resetPassword',
    component: ResetPasswordComponent,
    canActivate: [loggedInGuard],
  },
  { path: 'products', component: Products, canActivate: [authGuard] },
  {
    path: 'productDetails/:id',
    component: ProductDetails,
    canActivate: [authGuard],
  },
  {
    path: 'checkout/:id',
    component: CheckOut,
    canActivate: [authGuard, shippingGuard],
  },
  {
    path: 'cashorder/:id',
    component: CashOrder,
    canActivate: [authGuard, shippingGuard],
  },
  { path: 'allorders', component: Allorders, canActivate: [authGuard] },
  { path: 'categories', component: Categories, canActivate: [authGuard] },
  { path: 'brands', component: Brands, canActivate: [authGuard] },
  { path: 'cart', component: Cart, canActivate: [authGuard] },
  { path: '**', component: NotFoundPage },
];
