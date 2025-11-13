import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardContent, IonIcon, IonButton, IonButtons, IonModal } from '@ionic/angular/standalone';
import { FunctionService } from 'src/app/shared/services/function/function.service';
import { AuthService, User } from 'src/app/shared/services/auth/auth';
import { addIcons } from 'ionicons';
import { lockClosedOutline, callOutline, cartOutline, logOutOutline, mailOutline, locationOutline, trashOutline, create, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonCardContent, IonCardTitle, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonButtons, IonModal, ReactiveFormsModule]
})
export class ProfilePage implements OnInit {
  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
  });

  isModalOpen = false;
  userActual: User | null = null;
  getCompleteName: string = '';
  getInitials: string = '';

  constructor(
    private functionService: FunctionService,
    private authService: AuthService
  ) {
    addIcons({ createOutline, mailOutline, callOutline, cartOutline, lockClosedOutline, locationOutline, trashOutline, logOutOutline, create });
  }

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.userActual = this.functionService.getUserActual();
    this.getCompleteName = this.functionService.getCompleteName();
    this.getInitials = this.functionService.getUserInitials();
    this.setInputValues();
  }

  setOpen(isOpen: boolean): void {
    this.isModalOpen = isOpen;
  }

  onModalDidPresent(): void {
    this.isModalOpen = true;
  }

  onModalDidDismiss(): void {
    this.isModalOpen = false;
  }

  private setInputValues(): void {
    if (!this.userActual) return;

    this.form.setValue({
      firstName: this.userActual.name || '',
      lastName: this.userActual.lastName || '',
      email: this.userActual.email || '',
      phone: this.userActual.phone || ''
    });
  }

  onSaveChanges(): void {
    if (!this.form.valid) {
      alert('Por favor, complete el formulario correctamente');
      return;
    }

    try {
      const userData = this.authService.getUser();
      if (!userData) {
        alert('Error: No se pudo obtener la información del usuario');
        return;
      }

      userData.name = this.form.value.firstName || userData.name;
      userData.lastName = this.form.value.lastName || userData.lastName;
      userData.email = this.form.value.email || userData.email;
      userData.phone = this.form.value.phone || userData.phone;

      localStorage.setItem('user', JSON.stringify(userData));
      alert('Perfil actualizado con éxito');
      
      this.loadUserData();
      this.isModalOpen = false;
    } catch (error) {
      alert('Error al actualizar el perfil');
    }
  }

  deleteAccount(): void {
    const confirmation = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmation) {
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      this.functionService.navigateTo('/login');
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}

