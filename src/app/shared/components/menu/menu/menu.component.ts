import { CommonModule } from "@angular/common";
import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, ChangeDetectorRef } from "@angular/core";
import { Router, NavigationEnd } from "@angular/router";
import { Subscription, filter } from "rxjs";
import { IonButton, IonContent, IonIcon, IonTitle, IonHeader, IonToolbar, IonLabel, IonItem, IonList, IonMenu } from "@ionic/angular/standalone";
import { MenuController } from "@ionic/angular";
import { addIcons } from "ionicons";
import { bagHandle, grid, heart, home, person, logOutOutline, list, shieldCheckmark } from "ionicons/icons";
import { FunctionService } from "src/app/shared/services/function/function.service";
import { MenuService } from "src/app/shared/services/menu.service";
import { AuthService } from "src/app/shared/services/auth/auth";


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

export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('menu', { read: IonMenu }) menu!: IonMenu;

  isAdmin: boolean = false;
  private routerSubscription?: Subscription;
  private adminCheckInterval?: ReturnType<typeof setInterval>;

  constructor(
    private router: Router,
    private functionService: FunctionService,
    private menuController: MenuController,
    private menuService: MenuService,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {
    addIcons({ home, person, heart, bagHandle, grid, logOutOutline, list, shieldCheckmark });
  }

  ngOnInit(): void {
    // Verificar inmediatamente
    this.checkAdminStatus();
    
    // Escuchar cambios de ruta para actualizar el estado de admin y cerrar el menú
    this.routerSubscription = this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        // Cerrar el menú automáticamente cuando cambia de página
        this.closeMenu();
        
        setTimeout(() => {
          this.checkAdminStatus();
        }, 200);
      });
    
    // Verificar periódicamente el estado de admin (cada 2 segundos)
    this.adminCheckInterval = setInterval(() => {
      this.checkAdminStatus();
    }, 2000);
  }

  private checkAdminStatus(): void {
    const wasAdmin = this.isAdmin;
    const currentUser = this.authService.getUser();
    
    // Verificar el rol directamente del usuario
    const userRole = currentUser?.role;
    this.isAdmin = userRole === 'admin';
    
    // Log para debug
    console.log('MenuComponent - Checking admin status:', {
      currentUser,
      userRole,
      isAdmin: this.isAdmin,
      wasAdmin,
      userString: localStorage.getItem('user')
    });
    
    // Siempre forzar detección de cambios para asegurar que la vista se actualice
    // Esto es importante porque Angular puede no detectar cambios en propiedades anidadas
    if (wasAdmin !== this.isAdmin) {
      console.log('MenuComponent - Admin status changed, forcing change detection');
      this.cdr.detectChanges();
    } else {
      // Siempre forzar detección para asegurar que la vista esté actualizada
      this.cdr.markForCheck();
    }
  }

  async ngAfterViewInit(): Promise<void> {
    try {
      await this.waitForContentElement();
      await this.initializeMenu();
    } catch (error) {
      // Silently handle errors - menu will work via service
    }
  }

  private async waitForContentElement(): Promise<void> {
    const maxRetries = 3;
    const delay = 200;
    
    for (let i = 0; i < maxRetries; i++) {
      if (document.getElementById('main-content')) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

  private async initializeMenu(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (this.menu) {
      this.menu.disabled = false;
      this.menuService.setMenu(this.menu);
      await this.enableMenu();
    } else {
      setTimeout(() => this.retryMenuInitialization(), 500);
    }
  }

  private async enableMenu(): Promise<void> {
    try {
      await this.menuController.enable(true, 'main-menu');
    } catch (error) {
      // Menu will work via service
    }
  }

  private async retryMenuInitialization(): Promise<void> {
    if (this.menu) {
      this.menu.disabled = false;
      this.menuService.setMenu(this.menu);
      await this.enableMenu();
    }
  }

  ngOnDestroy(): void {
    this.menuController.enable(false, 'main-menu').catch(() => {});
    
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
    
    if (this.adminCheckInterval) {
      clearInterval(this.adminCheckInterval);
    }
  }

  async navegarA(ruta: string): Promise<void> {
    await this.closeMenu();
    this.router.navigate([ruta]);
  }

  async cerrarSesion(): Promise<void> {
    await this.closeMenu();
    this.authService.logout();
  }

  private async closeMenu(): Promise<void> {
    try {
      // Intentar cerrar mediante el servicio primero
      if (this.menuService.isMenuReady()) {
        const menu = this.menuService.getMenu();
        if (menu) {
          await menu.close();
          return;
        }
      }
      // Fallback al MenuController
      await this.menuController.close('main-menu');
    } catch (error) {
      // Silently handle errors
    }
  }

}