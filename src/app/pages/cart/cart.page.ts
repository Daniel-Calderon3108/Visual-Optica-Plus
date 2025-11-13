import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonImg } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/shared/components/header/header/header.component";
import { Cart, CartService } from 'src/app/services/cart.service';
import { FunctionService } from 'src/app/shared/services/function/function.service';
import { max } from 'rxjs';
import { EpaycoCheckout, EpaycoService } from 'src/app/services/epayco.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonImg, IonContent, CommonModule, FormsModule, HeaderComponent]
})
export class CartPage implements OnInit {

  cartItems: Cart[] = [];
  total: number = 0;
  user : any = {};

  constructor(private functionService: FunctionService, private cartService: CartService, private epaycoService: EpaycoService) { }

  ngOnInit() {
    this.user = this.functionService.getUserActual();
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
    const maxQuantity = item.product.stock - 4;

    if (operation === '-') {
      if (item.quantity > 1) {
        item.quantity--;
      }
    } else if (operation === '+') {
      if (item.quantity < maxQuantity) {
        item.quantity++;
      }
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
    this.processPayment();
    this.cartService.clearCart();
    this.cartItems = [];
    this.total = 0;
    this.changeCountCart();
  }

  async processPayment() {
    try{

      const numberFacture = this.epaycoService.generateInvoiceNumber();
      const description = this.cartItems.map(item => `${item.product.name} x${item.quantity}`).join(', ');
      const baseURL = window.location.origin;

      const paymentData : EpaycoCheckout = {
        name: "Visual Optica Plus",
        description: description,
        invoice: numberFacture,
        currency: "cop",
        amount: this.total,
        tax: 1,
        tax_base: 1,
        country: "co",
        lang: "es",
        external: "false",
        response: `${baseURL}/payment-response`,
        confirmation: `${baseURL}/payment-confirmation`,
        name_billing: this.user.name + ' ' + this.user.lastName,
        address_billing: this.user.address || 'N/A',
        type_doc_billing: this.user.typeDocument || 'N/A',
        mobilephone_billing: this.user.phone || 'N/A',
        number_doc_billing: this.user.documentNumber || 'N/A'
      };

      this.epaycoService.initializeCheckout(paymentData);
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  }
}
