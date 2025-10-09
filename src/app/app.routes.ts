import { Routes } from '@angular/router';

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
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'welcome',
    loadComponent: () => import('./pages/welcome/welcome.page').then( m => m.WelcomePage)
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/profile/profile.page').then( m => m.ProfilePage)
  },
  
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.page').then( m => m.ProductsPage)
  },
  {
    path: 'information/:slug',
    loadComponent: () => import('./pages/information/information/information.page').then( m => m.InformationPage)
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
    path: '**',
    redirectTo: 'splash'
  },
];
