import { Component, Input, OnInit } from '@angular/core';
import { FunctionService } from 'src/app/shared/services/function/function.service';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { cartOutline, menuOutline } from "ionicons/icons";
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

  constructor(private menuController: MenuController, public functionService: FunctionService, private cartService: CartService) {
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

  toggleMenu() {
    this.menuController.toggle();
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
