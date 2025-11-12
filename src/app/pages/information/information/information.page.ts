import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonImg, IonButton, IonIcon
} from '@ionic/angular/standalone';
import { ProductsService, Product } from 'src/app/services/products.service';
import { HeaderComponent } from 'src/app/shared/components/header/header/header.component';
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
    CommonModule, HeaderComponent,
    IonContent, IonImg, IonButton
  ],
})
export class InformationPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private products = inject(ProductsService);

  product: Product | null = null;
  isInTheCart: boolean = false;

  constructor(private functionService: FunctionService, private cartService: CartService) {
      addIcons({heart,star}); }

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    this.getProduct(slug);

    addIcons({ heart, star });
  }

  setStar(index: number) {
    for (let i = 0; i < 5; i++) {
      const starElement = document.getElementById(`start-${i}`);
      if (starElement) {
        if (i <= index) {
          starElement.classList.remove('empty');
        } else {
          starElement.classList.add('empty');
        }
      }
    }
  }

  toggleFavorite() {
    const heartElement = document.getElementById('heart');
    if (heartElement) {
      heartElement.classList.toggle('favorite-active');
    }
  }

  async addToCart(p: Product) {
    this.cartService.addToCart(p);
    this.isInTheCart = true;
    this.functionService.changeCountCart(await this.cartService.getTotalProducts());
  }

  private getProduct(slug: string) {
    this.products.getProductBySlug(slug).then(product => {
      this.product = product ?? null;
      if (!this.product) this.router.navigateByUrl('/products');

      const cart = this.cartService.getItems().then(items => {
        this.isInTheCart = items.some(item => item.product.id === this.product?.id);
      });
    });
  }
}

