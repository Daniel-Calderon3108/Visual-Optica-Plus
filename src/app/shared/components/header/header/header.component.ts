import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FunctionService } from 'src/app/shared/services/function/function.service';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { cartOutline, menuOutline } from "ionicons/icons";
import { MenuService } from 'src/app/shared/services/menu.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() appName: string = 'Visual Óptica Plus';
  @Input() showProfile: boolean = true;

  cartItemCount: number = 0;
  private cartSubscription?: any;

  constructor(
    private menuController: MenuController, 
    public functionService: FunctionService,
    private menuService: MenuService,
    private cartService: CartService
  ) { 
    addIcons({ cartOutline, menuOutline }); 
  }

  ngOnInit(): void {
    this.loadCartCount();
    this.subscribeToCartChanges();
  }

  ngOnDestroy(): void {
    if (this.cartSubscription) {
      this.cartSubscription.unsubscribe();
    }
  }

  private async loadCartCount(): Promise<void> {
    try {
      this.cartItemCount = await this.cartService.getTotalProducts();
    } catch (error) {
      this.cartItemCount = 0;
    }
  }

  private subscribeToCartChanges(): void {
    this.cartSubscription = this.functionService.currentCountCart.subscribe(
      (count: number) => {
        this.cartItemCount = count;
      }
    );
  }

  async toggleMenu(): Promise<void> {
    try {
      if (await this.tryToggleViaService()) {
        return;
      }
      await this.toggleViaController();
    } catch (error) {
      // Silently handle errors
    }
  }

  private async tryToggleViaService(): Promise<boolean> {
    const maxAttempts = 3;
    const delay = 200;

    for (let attempt = 0; attempt < maxAttempts; attempt++) {
      if (this.menuService.isMenuReady()) {
        const menu = this.menuService.getMenu();
        if (menu) {
          await menu.toggle();
          return true;
        }
      }
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    return false;
  }

  private async toggleViaController(): Promise<void> {
    await this.menuController.enable(true, 'main-menu');
    await new Promise(resolve => setTimeout(resolve, 100));
    await this.menuController.toggle('main-menu');
  }

  navigateToCart(): void {
    this.functionService.navigateTo('/cart');
  }
}
