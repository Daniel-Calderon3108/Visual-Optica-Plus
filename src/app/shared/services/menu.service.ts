import { Injectable } from '@angular/core';
import { IonMenu } from '@ionic/angular/standalone';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuRef: IonMenu | null = null;
  private menuReadySubject = new BehaviorSubject<boolean>(false);
  public menuReady$: Observable<boolean> = this.menuReadySubject.asObservable();

  setMenu(menu: IonMenu) {
    this.menuRef = menu;
    this.menuReadySubject.next(true);
  }

  getMenu(): IonMenu | null {
    return this.menuRef;
  }

  isMenuReady(): boolean {
    return this.menuRef !== null && this.menuReadySubject.value;
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

