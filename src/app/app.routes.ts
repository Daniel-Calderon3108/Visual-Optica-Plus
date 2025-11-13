import { Routes } from '@angular/router';
import { authGuard } from './shared/guards/auth.guard';
import { adminGuard } from './shared/guards/admin.guard';
import { guestGuard } from './shared/guards/guest.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'splash',
    pathMatch: 'full',
  },
  {
    path: 'splash',
    loadComponent: () => import('./pages/splash/splash.page').then( m => m.SplashPage)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage),
    canActivate: [guestGuard]
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage),
    canActivate: [guestGuard]
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then( m => m.WelcomePage),
    canActivate: [authGuard]
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage),
    canActivate: [authGuard]
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.page').then( m => m.ProductsPage),
    canActivate: [authGuard]
  },
  {
    path: 'information/:slug',
    loadComponent: () => import('./pages/information/information/information.page').then( m => m.InformationPage),
    canActivate: [authGuard]
  },
  {
    path: 'forget-password',
    loadComponent: () => import('./pages/foget.password/forget.password/forget.password.page').then( m => m.ForgetPasswordPage)
  },
  {
    path: 'reset-password/:token',
    loadComponent: () => import('./pages/reset.password/reset.password/reset.password.page').then( m => m.ResetPasswordPage)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.page').then( m => m.CartPage),
    canActivate: [authGuard]
  },
  {
    path: 'stores',
    loadComponent: () => import('./pages/stores/stores.page').then( m => m.StoresPage),
    canActivate: [authGuard]
  },
  {
    path: 'user-management',
    loadComponent: () => import('./pages/user-management/user-management.page').then( m => m.UserManagementPage),
    canActivate: [adminGuard]
  },
  {
    path: '**',
    redirectTo: 'splash'
  },
];
