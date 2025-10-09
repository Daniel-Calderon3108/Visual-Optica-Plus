import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardTitle, IonCardContent, IonIcon, IonButton, IonButtons, IonModal } from '@ionic/angular/standalone';
import { HeaderComponent } from "src/app/shared/components/header/header/header.component";
import { FunctionService } from 'src/app/shared/services/function/function.service';
import { addIcons } from 'ionicons';
import { lockClosedOutline, callOutline, cartOutline, logOutOutline, mailOutline, locationOutline, trashOutline, create, createOutline } from 'ionicons/icons';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonCardContent, IonCardTitle, IonCard, IonContent, IonHeader, IonCard, IonTitle, IonToolbar, CommonModule, FormsModule, HeaderComponent, IonButtons, IonModal, ReactiveFormsModule]
})
export class ProfilePage implements OnInit {

  form = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]),
  });

  isModalOpen = false;

  userActual : any;
  getCompleteName = this.functionService.getCompleteName();
  getInitials = this.functionService.getUserInitials();

  constructor(private functionService : FunctionService) { 
    addIcons({createOutline,mailOutline,callOutline,cartOutline,lockClosedOutline,locationOutline,trashOutline,logOutOutline,create});
  }

  ngOnInit() {
    this.userActual = this.functionService.getUserActual();
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = !!isOpen;
  }

  onModalDidPresent(event?: any) {
    this.isModalOpen = true;
  }

  onModalDidDismiss(event?: any) {
    this.isModalOpen = false;
  }

  onSaveChanges() {
    if (this.form.valid) {
      let userData = JSON.parse(localStorage.getItem('user') || '{}');
      userData.firstName = this.form.value.firstName || userData.firstName;
      userData.lastName = this.form.value.lastName || userData.lastName;
      userData.email = this.form.value.email || userData.email;
      userData.phone = this.form.value.phone || userData.phone;
      localStorage.setItem('user', JSON.stringify(userData));
      alert('Perfil actualizado con éxito');
      this.userActual = this.functionService.getUserActual();
      this.isModalOpen = false;
      return;
    }
    alert('Por favor, complete el formulario correctamente');
  }

  deleteAccount() {
    console.log('Eliminando cuenta...');
    const confirmation = confirm('¿Estás seguro de que deseas eliminar tu cuenta? Esta acción no se puede deshacer.');
    if (confirmation) {
      localStorage.removeItem('user');
      this.functionService.navigateTo('/login');
    }
  }

  logout() {
    alert('Cerrando sesión...');
    localStorage.removeItem('user');
    this.functionService.navigateTo('/login');
  }
}
