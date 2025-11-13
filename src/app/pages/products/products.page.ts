import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription, filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonImg,
  IonIcon
} from '@ionic/angular/standalone';
import { ProductsService, Product } from 'src/app/services/products.service';
import { FunctionService } from 'src/app/shared/services/function/function.service';
import { addIcons } from 'ionicons';
import { heart, heartOutline, storefrontOutline } from 'ionicons/icons';

@Component({
  selector: 'app-products',
  templateUrl: './products.page.html',
  styleUrls: ['./products.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonImg,
    IonIcon,
    CommonModule,
    FormsModule
  ]
})
export class ProductsPage implements OnInit, OnDestroy {
  favoriteProducts: Product[] = [];
  private routerSubscription?: Subscription;

  constructor(
    private productsService: ProductsService,
    private functionService: FunctionService,
    private router: Router
  ) {
    addIcons({ heart, heartOutline, storefrontOutline });
  }

  async ngOnInit(): Promise<void> {
    await this.loadFavorites();
    this.subscribeToRouteChanges();
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private subscribeToRouteChanges(): void {
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(async (event: NavigationEnd) => {
        if (event.url === '/products') {
          await this.loadFavorites();
        }
      });
  }

  private async loadFavorites(): Promise<void> {
    try {
      const favoriteIds = this.getFavoriteIds();
      
      if (favoriteIds.length === 0) {
        this.favoriteProducts = [];
        return;
      }

      const allProducts = await this.productsService.getProducts();
      this.favoriteProducts = allProducts.filter(product => 
        favoriteIds.includes(product.id)
      );
    } catch (error) {
      this.favoriteProducts = [];
    }
  }

  private getFavoriteIds(): string[] {
    try {
      const favoritesStr = localStorage.getItem('favorites');
      return favoritesStr ? JSON.parse(favoritesStr) : [];
    } catch {
      return [];
    }
  }

  verDetalle(producto: Product): void {
    this.functionService.navigateTo('information', producto.slug);
  }

  irATienda(): void {
    this.functionService.navigateTo('/welcome');
  }
}
