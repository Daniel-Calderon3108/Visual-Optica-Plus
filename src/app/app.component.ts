import { Component } from '@angular/core';
import {
  IonApp,
  IonRouterOutlet
} from '@ionic/angular/standalone';
import { HeaderComponent } from './shared/components/header/header/header.component';
import { MenuComponent } from './shared/components/menu/menu/menu.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [
    IonApp,
    IonRouterOutlet,
    HeaderComponent,
    MenuComponent
  ],
  standalone: true
})
export class AppComponent {
  constructor() {}
}
