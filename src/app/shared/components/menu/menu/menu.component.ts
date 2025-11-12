import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { IonButton, IonContent, IonIcon, IonTitle, IonHeader, IonToolbar, IonLabel, IonItem, IonList, IonMenu } from "@ionic/angular/standalone";
import { MenuController } from "@ionic/angular";
import { addIcons } from "ionicons";
import { bagHandle, grid, heart, settings, home, person, logOutOutline, list } from "ionicons/icons";
import { FunctionService } from "src/app/shared/services/function/function.service";
import { MenuService } from "src/app/shared/services/menu.service";


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

export class MenuComponent implements OnInit, AfterViewInit {
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;

  usuario: any = null;

  constructor(
    private router: Router,
    private functionService: FunctionService,
    private menuController: MenuController,
    private menuService: MenuService
  ) {
    addIcons({ home, person, settings, heart, bagHandle, grid, logOutOutline, list });
  }

  async ngOnInit() {
    this.usuario = this.functionService.getUserActual();
  }

  async ngAfterViewInit() {
    // Use multiple approaches to ensure menu is registered
    const registerMenu = () => {
      // Method 1: Try ViewChild
      if (this.menu) {
        this.menuService.setMenu(this.menu);
        this.menu.disabled = false;
        console.log('Menu registered via ViewChild');
        return;
      }
      
      // Method 2: Try DOM query
      const menuElement = document.querySelector('ion-menu[menuid="main-menu"]') as any;
      if (menuElement) {
        this.menuService.setMenu(menuElement);
        menuElement.disabled = false;
        console.log('Menu registered via DOM query');
        return;
      }
      
      console.warn('Menu not found, will retry...');
    };
    
    // Try immediately
    registerMenu();
    
    // Retry at different intervals
    setTimeout(registerMenu, 100);
    setTimeout(registerMenu, 300);
    setTimeout(registerMenu, 500);
    setTimeout(registerMenu, 1000);
    
    // Also try to enable via MenuController
    setTimeout(async () => {
      try {
        await this.menuController.enable(true, 'main-menu');
        console.log('Menu enabled via MenuController');
      } catch (error) {
        console.warn('MenuController enable failed:', error);
      }
    }, 500);
  }
  
  // Public method to open/close menu - can be called from header
  async openMenu() {
    if (this.menu) {
      this.menu.open();
    } else {
      await this.menuController.open('main-menu');
    }
  }
  
  async closeMenu() {
    if (this.menu) {
      this.menu.close();
    } else {
      await this.menuController.close('main-menu');
    }
  }
  
  async toggleMenu() {
    if (this.menu) {
      this.menu.toggle();
    } else {
      await this.menuController.toggle('main-menu');
    }
  }

  async navegarA(ruta: string) {
    await this.menuService.close();
    this.router.navigate([ruta]);
  }

  async cerrarSesion() {
    await this.menuService.close();
    localStorage.removeItem('user');
    this.functionService.navigateTo('/login');
  }

}