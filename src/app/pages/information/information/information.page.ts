import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonImg, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { ProductsService, Product } from 'src/app/services/products.service';
import { addIcons } from 'ionicons';
import { heart, star } from 'ionicons/icons';
import { CartService } from 'src/app/services/cart.service';
import { FunctionService } from 'src/app/shared/services/function/function.service';

@Component({
  standalone: true,
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
  imports: [IonIcon,
    CommonModule,
    IonContent, IonImg, IonButton
  ],
})
export class InformationPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private products = inject(ProductsService);

  product: Product | null = null;
  isInTheCart: boolean = false;
  isFavorite: boolean = false;

  constructor(
    private functionService: FunctionService, 
    private cartService: CartService
  ) {
    addIcons({ heart, star });
  }

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.getProduct(slug);
  }

  setStar(index: number): void {
    for (let i = 0; i < 5; i++) {
      const starElement = document.getElementById(`start-${i}`);
      if (starElement) {
        starElement.classList.toggle('empty', i > index);
      }
    }
  }

  toggleFavorite(): void {
    if (!this.product) return;
    
    this.isFavorite = !this.isFavorite;
    this.updateHeartIcon();
    this.saveFavoriteState();
  }

  private updateHeartIcon(): void {
    const heartElement = document.getElementById('heart');
    if (heartElement) {
      heartElement.classList.toggle('favorite-active', this.isFavorite);
    }
  }

  private saveFavoriteState(): void {
    if (!this.product) return;

    try {
      const favoriteIds = this.getFavoriteIds();
      
      if (this.isFavorite) {
        if (!favoriteIds.includes(this.product.id)) {
          favoriteIds.push(this.product.id);
        }
      } else {
        const index = favoriteIds.indexOf(this.product.id);
        if (index > -1) {
          favoriteIds.splice(index, 1);
        }
      }
      
      localStorage.setItem('favorites', JSON.stringify(favoriteIds));
    } catch (error) {
      // Silently handle errors
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

  async addToCart(product: Product): Promise<void> {
    await this.cartService.addToCart(product);
    this.isInTheCart = true;
    const totalProducts = await this.cartService.getTotalProducts();
    this.functionService.changeCountCart(totalProducts);
  }

  private async getProduct(slug: string): Promise<void> {
    try {
      const product = await this.products.getProductBySlug(slug);
      this.product = product ?? null;
      
      if (!this.product) {
        this.router.navigateByUrl('/products');
        return;
      }

      await this.checkCartStatus();
      this.checkIfFavorite();
    } catch (error) {
      this.router.navigateByUrl('/products');
    }
  }

  private async checkCartStatus(): Promise<void> {
    try {
      const items = await this.cartService.getItems();
      this.isInTheCart = items.some(item => item.product.id === this.product?.id);
    } catch (error) {
      this.isInTheCart = false;
    }
  }

  private checkIfFavorite(): void {
    if (!this.product) return;
    
    try {
      const favoriteIds = this.getFavoriteIds();
      this.isFavorite = favoriteIds.includes(this.product.id);
      this.updateHeartIcon();
    } catch (error) {
      this.isFavorite = false;
    }
  }
}

