import { Injectable, inject } from "@angular/core";
import { Router } from "@angular/router";
import { MenuController } from "@ionic/angular";
import { MenuService } from "./menu.service";

export type UserRole = 'admin' | 'user';

export interface User {
  id?: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  user: string;
  password: string;
  role: UserRole;
}

@Injectable({
  providedIn: "root",
})
export class AuthService {
    private menuController = inject(MenuController);
    private menuService = inject(MenuService);
    
    constructor(private router: Router) { }

    isAuthenticated(): boolean {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');
        return !!user && !!token;
    }

    getUserRole(): UserRole | null {
        const user = this.getUser();
        return user?.role || null;
    }

    isAdmin(): boolean {
        return this.getUserRole() === 'admin';
    }

    isUser(): boolean {
        return this.getUserRole() === 'user';
    }

    getUser(): User | null {
        try {
            const userStr = localStorage.getItem('user');
            if (!userStr) return null;
            return JSON.parse(userStr) as User;
        } catch (error) {
            return null;
        }
    }

    async logout(): Promise<void> {
        // Cerrar el menú antes de cerrar sesión
        await this.closeMenu();
        
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
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