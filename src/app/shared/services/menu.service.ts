import { Injectable } from '@angular/core';
import { IonMenu } from '@ionic/angular/standalone';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuRef: IonMenu | null = null;

  setMenu(menu: IonMenu) {
    this.menuRef = menu;
  }

  getMenu(): IonMenu | null {
    return this.menuRef;
  }

  async open() {
    if (this.menuRef) {
      return this.menuRef.open();
    }
    return Promise.resolve();
  }

  async close() {
    if (this.menuRef) {
      return this.menuRef.close();
    }
    return Promise.resolve();
  }

  async toggle() {
    if (this.menuRef) {
      return this.menuRef.toggle();
    }
    return Promise.resolve();
  }
}

