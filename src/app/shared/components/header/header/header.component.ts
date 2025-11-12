import { Component, Input, OnInit } from '@angular/core';
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
export class HeaderComponent implements OnInit {

  @Input() appName: string = 'Visual Óptica Plus';
  @Input() showProfile: boolean = true;

  userActual: any = null;
  cartItemCount: number = 0;

  constructor(
    private menuController: MenuController, 
    public functionService: FunctionService,
    private menuService: MenuService,
    private cartService: CartService
  ) { 
    addIcons({ cartOutline, menuOutline }); 
  }

  ngOnInit() {
    this.userActual = this.functionService.getUserActual();
    this.setCartItemCount();
    this.detectChangesCountCart();
  }
  
  setCartItemCount() {
    this.cartService.getTotalProducts().then(count => {
      this.cartItemCount = count;
    });
  }

  async toggleMenu() {
    console.log('Toggle menu called');
    
    // Try using the service first (direct menu reference)
    const menu = this.menuService.getMenu();
    console.log('Menu from service:', menu);
    
    if (menu) {
      console.log('Using menu service to toggle');
      try {
        await this.menuService.toggle();
        console.log('Menu toggled via service');
        return;
      } catch (error) {
        console.error('Error toggling via service:', error);
      }
    }
    
    // Try direct DOM access as fallback
    try {
      const menuElement = document.querySelector('ion-menu[menuid="main-menu"]') as any;
      if (menuElement) {
        console.log('Found menu via DOM, toggling directly');
        await menuElement.toggle();
        return;
      }
    } catch (error) {
      console.error('Error with DOM access:', error);
    }
    
    // Last resort: Try MenuController
    try {
      await this.menuController.enable(true, 'main-menu');
      const menuFromController = await this.menuController.get('main-menu');
      
      if (menuFromController) {
        const isOpen = await this.menuController.isOpen('main-menu');
        if (isOpen) {
          await this.menuController.close('main-menu');
        } else {
          await this.menuController.open('main-menu');
        }
      } else {
        console.error('Menu not found in MenuController');
      }
    } catch (error) {
      console.error('Error toggling menu:', error);
    }
  }

  navigateToCart() {
    this.functionService.navigateTo('/cart');
  }

  detectChangesCountCart() {
    this.functionService.currentCountCart.subscribe(count => {
      this.cartItemCount = count;
    });
  }
}
