import { Routes } from '@angular/router';
import { authGuard } from './core/guard/auth-guard';
import { loggedInGuard } from './core/guard/logged-in-guard';
import { shippingGuard } from './core/guard/shipping-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./features/home/home').then((c) => c.Home),
  },
  {
    path: 'login',
    loadComponent: () => import('./core/auth/login/login').then((c) => c.Login),
    canActivate: [loggedInGuard],
  },
  {
    path: 'signup',
    loadComponent: () =>
      import('./core/auth/sign-up/sign-up').then((c) => c.SignUp),
    canActivate: [loggedInGuard],
  },
  {
    path: 'resetPassword',
    loadComponent: () =>
      import(
        './core/auth/reset-password-component/reset-password-component'
      ).then((c) => c.ResetPasswordComponent),
    canActivate: [loggedInGuard],
  },
  {
    path: 'products',
    loadComponent: () =>
      import('./features/products/products').then((c) => c.Products),
    canActivate: [authGuard],
  },
  {
    path: 'productDetails/:id',
    loadComponent: () =>
      import('./features/product-details/product-details').then(
        (c) => c.ProductDetails
      ),
    canActivate: [authGuard],
  },
  {
    path: 'wishlist',
    loadComponent: () =>
      import('./features/wishlist/wishlist').then((c) => c.Wishlist),
    canActivate: [authGuard],
  },
  {
    path: 'checkout/:id',
    loadComponent: () =>
      import('./features/check-out/check-out').then((c) => c.CheckOut),
    canActivate: [authGuard, shippingGuard],
  },
  {
    path: 'cashorder/:id',
    loadComponent: () =>
      import('./features/cash-order/cash-order').then((c) => c.CashOrder),
    canActivate: [authGuard, shippingGuard],
  },
  {
    path: 'allorders',
    loadComponent: () =>
      import('./features/allorders/allorders').then((c) => c.Allorders),
    canActivate: [authGuard],
  },
  {
    path: 'categories',
    loadComponent: () =>
      import('./features/categories/categories').then((c) => c.Categories),
    canActivate: [authGuard],
  },
  {
    path: 'brands',
    loadComponent: () =>
      import('./features/brands/brands').then((c) => c.Brands),
    canActivate: [authGuard],
  },
  {
    path: 'cart',
    loadComponent: () => import('./features/cart/cart').then((c) => c.Cart),
    canActivate: [authGuard],
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found-page/not-found-page').then(
        (c) => c.NotFoundPage
      ),
  },
];
