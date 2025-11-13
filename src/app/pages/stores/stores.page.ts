import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { location, storefront, locationOutline, callOutline, timeOutline } from 'ionicons/icons';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.page.html',
  styleUrls: ['./stores.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonIcon,
    CommonModule
  ]
})
export class StoresPage implements OnInit {

  constructor() {
    addIcons({ location, storefront, locationOutline, callOutline, timeOutline });
  }

  ngOnInit() {
  }

}

