import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  IonContent, 
  IonSelect, 
  IonSelectOption,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonBadge,
  AlertController
} from '@ionic/angular/standalone';
import { RolesService, User } from 'src/app/shared/services/roles.service';
import { AuthService, UserRole } from 'src/app/shared/services/auth/auth';
import { addIcons } from 'ionicons';
import { person, shieldCheckmark, search, refresh, mailOutline, personOutline, searchOutline } from 'ionicons/icons';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.page.html',
  styleUrls: ['./user-management.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonSelect,
    IonSelectOption,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonBadge,
    CommonModule,
    FormsModule
  ]
})
export class UserManagementPage implements OnInit {
  users: User[] = [];
  filteredUsers: User[] = [];
  searchQuery: string = '';
  currentUser: User | null = null;

  constructor(
    private rolesService: RolesService,
    private authService: AuthService,
    private alertController: AlertController
  ) {
    addIcons({ person, shieldCheckmark, search, refresh, mailOutline, personOutline, searchOutline });
  }

  ngOnInit() {
    this.loadUsers();
    this.currentUser = this.rolesService.getCurrentUser();
  }

  loadUsers() {
    this.users = this.rolesService.getAllUsers();
    this.filteredUsers = [...this.users];
  }

  onSearchChange(event: CustomEvent): void {
    const query = (event.detail?.value as string) || '';
    this.searchQuery = query;
    
    if (!query.trim()) {
      this.filteredUsers = [...this.users];
      return;
    }

    this.filteredUsers = this.rolesService.searchUsers(query);
  }

  async onRoleChange(user: User, event: CustomEvent): Promise<void> {
    const newRole: UserRole = event.detail.value as UserRole;
    
    // No permitir cambiar el rol del usuario actual si es el único admin
    if (user.id === this.currentUser?.id && newRole === 'user') {
      const adminCount = this.users.filter(u => u.role === 'admin' && u.id !== user.id).length;
      if (adminCount === 0) {
        const alert = await this.alertController.create({
          header: 'Error',
          message: 'No puedes cambiar tu propio rol. Debe haber al menos un administrador.',
          buttons: ['OK']
        });
        await alert.present();
        // Restaurar el valor anterior
        const target = event.target as HTMLIonSelectElement;
        if (target) {
          target.value = user.role;
        }
        return;
      }
    }

    const confirmed = await this.confirmRoleChange(user, newRole);
    if (confirmed) {
      const success = this.rolesService.updateUserRole(user.id!, newRole);
      if (success) {
        this.loadUsers();
        // Si es el usuario actual, recargar la página para actualizar permisos
        if (user.id === this.currentUser?.id) {
          window.location.reload();
        }
      }
    } else {
      // Restaurar el valor anterior
      const target = event.target as HTMLIonSelectElement;
      if (target) {
        target.value = user.role;
      }
    }
  }

  private async confirmRoleChange(user: User, newRole: UserRole): Promise<boolean> {
    return new Promise(async (resolve) => {
      const alert = await this.alertController.create({
        header: 'Confirmar cambio',
        message: `¿Estás seguro de cambiar el rol de ${user.name} ${user.lastName} a ${newRole === 'admin' ? 'Administrador' : 'Usuario'}?`,
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => resolve(false)
          },
          {
            text: 'Confirmar',
            handler: () => resolve(true)
          }
        ]
      });
      await alert.present();
    });
  }

  getRoleLabel(role: UserRole): string {
    return role === 'admin' ? 'Administrador' : 'Usuario';
  }

  getRoleColor(role: UserRole): string {
    return role === 'admin' ? 'danger' : 'primary';
  }

  refreshUsers() {
    this.loadUsers();
    this.searchQuery = '';
  }

  isSelectDisabled(user: User): boolean {
    if (user.id === this.currentUser?.id && user.role === 'admin') {
      const adminCount = this.users.filter(u => u.role === 'admin' && u.id !== user.id).length;
      return adminCount === 0;
    }
    return false;
  }
}

