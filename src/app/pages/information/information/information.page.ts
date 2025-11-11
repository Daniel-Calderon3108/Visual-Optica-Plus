import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonContent, IonCard, IonCardHeader, IonCardTitle,
  IonCardContent, IonImg, IonButton, IonIcon } from '@ionic/angular/standalone';
import { ProductsService, Product } from 'src/app/services/products.service';
import { HeaderComponent } from 'src/app/shared/components/header/header/header.component';
import { addIcons } from 'ionicons';
import { heart, star } from 'ionicons/icons';

@Component({
  standalone: true,
  selector: 'app-information',
  templateUrl: './information.page.html',
  styleUrls: ['./information.page.scss'],
  imports: [IonIcon, 
    CommonModule, HeaderComponent,
    IonContent, IonCard, IonCardHeader, IonCardTitle,
    IonCardContent, IonImg, IonButton
  ],
})
export class InformationPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private products = inject(ProductsService);

  product: Product | null = null;

  ngOnInit() {
    const slug = this.route.snapshot.paramMap.get('slug') ?? '';
    
    this.products.getProductBySlug(slug).then(product => {
      this.product = product ?? null;
      if (!this.product) this.router.navigateByUrl('/products');
    });
    addIcons({ heart, star });
  }

  addToCart(p: Product) { console.log('ADD TO CART', p); }
}

