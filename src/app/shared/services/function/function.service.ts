import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  userActual: any = null;


  constructor(private router: Router) { }

  // Navegar a una URL específica
  navigateTo(url: string, data: string = ""): void {
    if (data) {
      this.router.navigate([url, data]);  
      return;
    }
    this.router.navigateByUrl(url);
  }

  // Obtener el usuario actual desde el almacenamiento local
  getUserActual() {
    try {
      this.userActual = localStorage.getItem('user');

      if (!this.userActual) return null;
      this.userActual = JSON.parse(this.userActual);
      return this.userActual;
    } catch (error) {
      return null;
    }
  }

  // Obtener el nombre completo del usuario
  getCompleteName(): string {
    this.getUserActual();
    if (!this.userActual) return 'Invitado';
    return `${this.userActual.name} ${this.userActual.lastName}`;
  }

  // Obtener las iniciales del usuario
  getUserInitials(): string {
    if (!this.userActual) return 'I';
    return `${this.userActual.name.charAt(0)}${this.userActual.lastName.charAt(0)}`;
  }
}
