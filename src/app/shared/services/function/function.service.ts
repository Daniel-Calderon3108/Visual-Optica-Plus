import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../auth/auth';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {
  private readonly TOKEN_LENGTH = 16;
  private readonly TOKEN_CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  
  private countCartSubject = new BehaviorSubject<number>(0);
  public readonly currentCountCart: Observable<number> = this.countCartSubject.asObservable();

  constructor(private router: Router) { }

  navigateTo(url: string, data: string = ""): void {
    if (data) {
      this.router.navigate([url, data]);  
      return;
    }
    this.router.navigateByUrl(url);
  }

  getUserActual(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      return JSON.parse(userStr) as User;
    } catch (error) {
      return null;
    }
  }

  getCompleteName(): string {
    const user = this.getUserActual();
    if (!user) return 'Invitado';
    return `${user.name} ${user.lastName}`;
  }

  getUserInitials(): string {
    const user = this.getUserActual();
    if (!user) return 'I';
    return `${user.name.charAt(0)}${user.lastName.charAt(0)}`;
  }

  async generateToken(): Promise<string> {
    let token = '';
    for (let i = 0; i < this.TOKEN_LENGTH; i++) {
      token += this.TOKEN_CHARACTERS.charAt(
        Math.floor(Math.random() * this.TOKEN_CHARACTERS.length)
      );
    }
    await this.saveToken(token);
    return token;
  }

  private async saveToken(token: string): Promise<void> {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  changeCountCart(count: number): void {
    this.countCartSubject.next(count);
  }
}