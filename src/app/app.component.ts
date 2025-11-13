import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { MenuController } from '@ionic/angular';
import { HeaderComponent } from './shared/components/header/header/header.component';
import { MenuComponent } from './shared/components/menu/menu/menu.component';
import { AuthService } from './shared/services/auth/auth';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonApp,
    IonRouterOutlet,
    HeaderComponent,
    MenuComponent,
    CommonModule
  ],
  standalone: true
})
export class AppComponent implements OnInit, OnDestroy {
  showHeaderAndMenu: boolean = false;
  private routerSubscription?: Subscription;
  private readonly publicRoutes = ['/splash', '/login', '/register', '/forget-password'];
  private readonly MENU_INIT_DELAY = 1000;

  constructor(
    private authService: AuthService,
    private router: Router,
    private menuController: MenuController
  ) {}

  ngOnInit(): void {
    this.checkInitialRoute();
    this.updateVisibility();
    this.subscribeToRouteChanges();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private checkInitialRoute(): void {
    const currentRoute = this.router.url.split('?')[0];
    if (currentRoute === '/' || currentRoute === '') {
      this.router.navigate(['/splash'], { replaceUrl: true });
    }
  }

  private subscribeToRouteChanges(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        setTimeout(() => this.updateVisibility(), 100);
      });
  }

  private async updateVisibility(): Promise<void> {
    const currentRoute = this.router.url.split('?')[0];
    const isPublicRoute = this.isPublicRoute(currentRoute);
    const isAuthenticated = this.authService.isAuthenticated();
    
    this.showHeaderAndMenu = isAuthenticated && !isPublicRoute;
    
    await this.manageMenuState(this.showHeaderAndMenu);
  }

  private isPublicRoute(route: string): boolean {
    return this.publicRoutes.some(
      publicRoute => route === publicRoute || route.startsWith('/reset-password')
    );
  }

  private async manageMenuState(shouldShow: boolean): Promise<void> {
    try {
      await new Promise(resolve => setTimeout(resolve, this.MENU_INIT_DELAY));
      await this.menuController.enable(shouldShow, 'main-menu');
    } catch (error) {
      // Menu will work via service
    }
  }
}
