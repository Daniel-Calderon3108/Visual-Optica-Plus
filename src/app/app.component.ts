import { Component } from '@angular/core';
import {
  IonApp,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonRouterOutlet
} from '@ionic/angular/standalone';
import { HeaderComponent } from './shared/components/header/header/header.component';
//import { MenuComponent } from './shared/components/menu/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [
    IonApp,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonRouterOutlet,
    HeaderComponent,
    //MenuComponent
  ],
  standalone: true
})
export class AppComponent {
  constructor() {}
}
