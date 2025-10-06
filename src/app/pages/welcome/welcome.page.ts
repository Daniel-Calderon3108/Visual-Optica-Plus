import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonImg,
 
} from '@ionic/angular/standalone';
import { HeaderComponent } from 'src/app/shared/components/header/header/header.component';
import { grid } from 'ionicons/icons';
import { FunctionService } from 'src/app/shared/services/function/function.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.page.html',
  styleUrls: ['./welcome.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    FormsModule,
    HeaderComponent,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonImg,
    
  ],
})
export class WelcomePage implements OnInit {
  productos = [
    {
      nombre: 'Gafas de sol polarizadas',
      precio: 180000,
      descripcion: 'Protección UV400 con marco de policarbonato resistente.',
      imagen: 'assets/img/gafas1.jpg',
    },
    {
      nombre: 'Lentes oftálmicos antirreflejo',
      precio: 250000,
      descripcion: 'Cristales con recubrimiento antirreflejo y filtro azul.',
      imagen: 'assets/img/gafas2.jpg',
    },
    {
      nombre: 'Montura metálica unisex',
      precio: 190000,
      descripcion: 'Diseño moderno con patillas flexibles.',
      imagen: 'assets/img/gafas3.jpg',
    },
     {
      nombre: 'Gafas de sol polarizadas',
      precio: 180000,
      descripcion: 'Protección UV400 con marco de policarbonato resistente.',
      imagen: 'assets/img/gafas1.jpg',
    },
    {
      nombre: 'Lentes oftálmicos antirreflejo',
      precio: 250000,
      descripcion: 'Cristales con recubrimiento antirreflejo y filtro azul.',
      imagen: 'assets/img/gafas2.jpg',
    },
    {
      nombre: 'Montura metálica unisex',
      precio: 190000,
      descripcion: 'Diseño moderno con patillas flexibles.',
      imagen: 'assets/img/gafas3.jpg',
    },
  ];

  agregarAlCarrito(producto: any) {
    console.log('Producto agregado:', producto);
  }

  verDetalle(producto: string) {
    this.funtion_services.navigateTo('/information',producto);
  }

  constructor(private funtion_services:FunctionService) {

  }

  ngOnInit() {}
}
