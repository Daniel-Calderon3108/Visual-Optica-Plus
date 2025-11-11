import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AuthService {
    constructor() { }

    isAuthenticated(): boolean {
        const user = localStorage.getItem('user');
        return !!user;
    }
}