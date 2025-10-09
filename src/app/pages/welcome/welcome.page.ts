import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonImg
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header/header.component';
import { FunctionService } from 'src/app/shared/services/function/function.service';
import { ProductsService, Product } from 'src/app/services/products.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonContent, CommonModule, FormsModule, HeaderComponent,
    IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, 
    IonCardContent, IonButton, IonImg,
  ],
})
export class WelcomePage implements OnInit {
  productos: Product[] = [];

  nameUser: string = this.functionService.getCompleteName();

  constructor(
    private functionService: FunctionService,
    private productsService: ProductsService
  ) {}

  ngOnInit() {
    this.productos = this.productsService.getAll();
  }

  agregarAlCarrito(producto: Product) {
    console.log('Producto agregado:', producto);
  }

  verDetalle(producto: Product) {
    // navega a /information/<slug>
    this.functionService.navigateTo('information', producto.slug);
  }
}
