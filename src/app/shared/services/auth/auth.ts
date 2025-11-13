import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

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

    logout(): void {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }
}