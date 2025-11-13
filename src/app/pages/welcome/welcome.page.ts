import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonImg
} from '@ionic/angular/standalone';
import { FunctionService } from 'src/app/shared/services/function/function.service';
import { ProductsService, Product } from 'src/app/services/products.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonContent, CommonModule, FormsModule,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonButton, IonImg,
  ],
})
export class WelcomePage implements OnInit {
  productos: Product[] = [];

  constructor(
    private functionService: FunctionService,
    private productsService: ProductsService
  ) {}

  async ngOnInit(): Promise<void> {
    this.productos = await this.productsService.getProducts();
  }

  verDetalle(producto: Product): void {
    this.functionService.navigateTo('information', producto.slug);
  }
}
