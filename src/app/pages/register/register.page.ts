import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { FunctionService } from 'src/app/shared/services/function/function.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class RegisterPage implements OnInit {

  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required])
  });


  constructor(private functionService: FunctionService) { }

  ngOnInit() {
  }

  navigateToLogin = () => this.functionService.navigateTo('/login');

  onRegister() {
    if (!this.form.valid) { // Verifica si el formulario es válido
      alert('Todos los campos son obligatorios');
      return;
    }

    if (this.form.value.password !== this.form.value.confirmPassword) { // Verifica si las contraseñas coinciden
      alert('Las contraseñas no coinciden');
      return;
    }

    // Crea un objeto con los datos del usuario
    const userData = {
      name: this.form.value.name,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      phone: this.form.value.phone,
      user: this.form.value.user,
      password: btoa(this.form.value.password || '') // Encripta la contraseña usando Base64
    };

    // Guarda los datos del usuario en el localStorage
    localStorage.setItem('user', JSON.stringify(userData));

    this.functionService.navigateTo('/login'); // Navega a la página de login después del registro exitoso
  }
}
