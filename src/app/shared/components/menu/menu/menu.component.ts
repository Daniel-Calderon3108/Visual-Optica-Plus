import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { IonButton, IonContent, IonIcon, IonTitle, IonHeader, IonToolbar, IonLabel, IonItem, IonList, IonMenu, MenuController } from "@ionic/angular";
import { addIcons } from "ionicons";
import { bagHandle, grid, heart, settings, home, person, logOut, list } from "ionicons/icons";
import { AuthService, usuario } from "src/app/services/auth";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonLabel,
    IonIcon,
    IonButton
  ]
})

export class MenuComponent implements OnInit {

  usuario: usuario | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private menuController: MenuController
  ) {
    addIcons({ home, person, settings, heart, bagHandle, grid, logOut, list });
  }

  async ngOnInit() {
    this.usuario = await this.authService.obtenerUsuarioActual;
  }

  async navegarA(ruta: string) {
    await this.menuController.close('main-menu');
    this.router.navigate([ruta]);
  }

  async cerrarSesion() {
    await this.menuController.close('main-menu');
    await this.authService.logout();
  }

}