import { Injectable } from '@angular/core';
import { UserRole } from './auth/auth';

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
  providedIn: 'root'
})
export class RolesService {
  private readonly USERS_KEY = 'users_list';
  private readonly CURRENT_USER_KEY = 'user';

  constructor() {
    this.initializeDefaultAdmin();
  }

  // Inicializar admin por defecto si no existe
  private initializeDefaultAdmin(): void {
    const users = this.getAllUsers();
    const adminExists = users.some(u => u.role === 'admin');
    
    if (!adminExists) {
      const defaultAdmin: User = {
        id: this.generateId(),
        name: 'Admin',
        lastName: 'Sistema',
        email: 'admin@visualoptica.com',
        phone: '1234567890',
        user: 'admin',
        password: btoa('admin123'), // Contraseña: admin123
        role: 'admin'
      };
      users.push(defaultAdmin);
      this.saveAllUsers(users);
    }
  }

  // Obtener todos los usuarios
  getAllUsers(): User[] {
    try {
      const usersStr = localStorage.getItem(this.USERS_KEY);
      if (!usersStr) {
        // Si no hay lista, crear una con el usuario actual si existe
        const currentUser = this.getCurrentUser();
        if (currentUser) {
          const users = [currentUser];
          this.saveAllUsers(users);
          return users;
        }
        return [];
      }
      return JSON.parse(usersStr);
    } catch (error) {
      return [];
    }
  }

  // Guardar todos los usuarios
  private saveAllUsers(users: User[]): void {
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
  }

  // Obtener usuario actual
  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem(this.CURRENT_USER_KEY);
      if (!userStr) return null;
      return JSON.parse(userStr);
    } catch (error) {
      return null;
    }
  }

  // Obtener usuario por ID
  getUserById(id: string): User | null {
    const users = this.getAllUsers();
    return users.find(u => u.id === id) || null;
  }

  // Actualizar rol de usuario
  updateUserRole(userId: string, newRole: UserRole): boolean {
    const users = this.getAllUsers();
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) return false;

    users[userIndex].role = newRole;
    this.saveAllUsers(users);

    // Si es el usuario actual, actualizar también
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.id === userId) {
      currentUser.role = newRole;
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(currentUser));
    }

    return true;
  }

  // Crear o actualizar usuario
  saveUser(user: User): void {
    const users = this.getAllUsers();
    
    if (user.id) {
      // Actualizar usuario existente
      const index = users.findIndex(u => u.id === user.id);
      if (index !== -1) {
        users[index] = user;
      }
    } else {
      // Verificar si el usuario ya existe por nombre de usuario o email
      const existingUser = users.find(u => u.user === user.user || u.email === user.email);
      if (existingUser) {
        // Actualizar usuario existente
        const index = users.findIndex(u => u.id === existingUser.id);
        if (index !== -1) {
          // Mantener el ID y rol existente si no se especifica
          user.id = existingUser.id;
          if (!user.role && existingUser.role) {
            user.role = existingUser.role;
          }
          users[index] = user;
        }
      } else {
        // Nuevo usuario
        user.id = this.generateId();
        users.push(user);
      }
    }

    this.saveAllUsers(users);
  }

  // Eliminar usuario
  deleteUser(userId: string): boolean {
    const users = this.getAllUsers();
    const filteredUsers = users.filter(u => u.id !== userId);
    
    if (filteredUsers.length === users.length) return false;

    this.saveAllUsers(filteredUsers);
    return true;
  }

  // Generar ID único
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2);
  }

  // Buscar usuarios
  searchUsers(query: string): User[] {
    const users = this.getAllUsers();
    const lowerQuery = query.toLowerCase();
    
    return users.filter(user => 
      user.name.toLowerCase().includes(lowerQuery) ||
      user.lastName.toLowerCase().includes(lowerQuery) ||
      user.email.toLowerCase().includes(lowerQuery) ||
      user.user.toLowerCase().includes(lowerQuery)
    );
  }
}

