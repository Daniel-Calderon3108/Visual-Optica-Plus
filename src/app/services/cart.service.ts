import { Injectable } from "@angular/core";

export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  description: string;
  image: string;
  slug: string;
}

export interface Cart {
    product: Product;
    quantity: number;
}
@Injectable({ providedIn: 'root' })
export class CartService {
    private cart: Cart[] = [];

    constructor() { 
        this.loadCart();
    }

    private async loadCart() : Promise<void> {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) this.cart = JSON.parse(storedCart);
    }

    private async saveCart() : Promise<void> {
        localStorage.setItem('cart', JSON.stringify(this.cart));
    }

    async getItems(): Promise<Cart[]> {
        await this.loadCart();
        return new Promise((resolve) => {
            resolve([...this.cart]);
        });
    }

    async addToCart(product: Product, quantity: number= 1): Promise<boolean> {
        await this.loadCart();
        const existingItem = this.cart.find(item => item.product.id === product.id);

        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.cart.push({ product, quantity });
        }
        await this.saveCart();

        return new Promise((resolve) => resolve(true));
    }

    async updateQuantity(productId: string, quantity: number): Promise<boolean> {
        await this.loadCart();
        const item = this.cart.find(i => i.product.id === productId);

        if (item) {
            if (quantity <= 0) return await this.removeFromCart(productId);
            item.quantity = quantity;
        }
        await this.saveCart();
        return new Promise((resolve) => resolve(true));       
    }

    async removeFromCart(productId: string): Promise<boolean> {
        await this.loadCart();
        const item = this.cart.find(i => i.product.id === productId);

        if (item) {
            this.cart.splice(this.cart.indexOf(item), 1);
            await this.saveCart();
            return new Promise((resolve) => resolve(true));
        }
        return new Promise((resolve) => resolve(false));
    }

    async clearCart(): Promise<void> {
        this.cart = [];
        await this.saveCart();
    }

    async getTotalProducts(): Promise<number> {
        await this.loadCart();
        const total = this.cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
        return new Promise((resolve) => resolve(total));
    }

    async calculateTotal(): Promise<number> {
        await this.loadCart();
        const total = this.cart.reduce((sum, item) => sum + item.quantity * item.product.price, 0);
        return new Promise((resolve) => resolve(total));
    }

    async getTotalProductSpecific(productId: string): Promise<number> {
        await this.loadCart();
        const item = this.cart.find(i => i.product.id === productId);
        const total = item ? item.quantity : 0;
        return new Promise((resolve) => resolve(total));
    }
}