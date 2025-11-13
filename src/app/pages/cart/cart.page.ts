import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonImg } from '@ionic/angular/standalone';
import { Cart, CartService } from 'src/app/services/cart.service';
import { FunctionService } from 'src/app/shared/services/function/function.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonImg, IonContent, CommonModule, FormsModule]
})
export class CartPage implements OnInit {

  cartItems: Cart[] = [];
  total: number = 0;

  constructor(private functionService: FunctionService, private cartService: CartService) { }

  ngOnInit() {
    this.getCartItems();
    this.calculateTotal();
  }

  async getCartItems() {
    this.cartItems = await this.cartService.getItems();
  }

  async calculateTotal() {
    this.total = await this.cartService.calculateTotal();
  }

  updateQuantity(item: Cart, operation: string) {
    if (operation === '-') {
      if (item.quantity > 1) {
        item.quantity--;
      }
    } else if (operation === '+') {
      item.quantity++;
    }
    this.cartService.updateQuantity(item.product.id, item.quantity);
    this.calculateTotal();
    this.changeCountCart();
  }

  async removeItem(id: string) {
    if (await this.cartService.removeFromCart(id)) {
      this.getCartItems();
      this.calculateTotal();
      this.changeCountCart();
    }
  }

  async changeCountCart() {
    this.functionService.changeCountCart(await this.cartService.getTotalProducts());
  }

  buy() {
    this.cartService.clearCart();
    this.cartItems = [];
    this.total = 0;
    this.changeCountCart();
  }
}
