import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { FunctionService } from 'src/app/shared/services/function/function.service';

@Component({
  selector: 'app-reset.password',
  templateUrl: './reset.password.page.html',
  styleUrls: ['./reset.password.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ResetPasswordPage implements OnInit {

  form = new FormGroup({
    newPassword: new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/)]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(private activatedRoute : ActivatedRoute, private functionService : FunctionService) { }

  ngOnInit(): void {
    const token = this.activatedRoute.snapshot.paramMap.get('token') || '';
    const storedToken = this.functionService.getToken();
    
    if (!token || token !== storedToken) {
      alert('Token inválido o expirado');
      this.functionService.navigateTo('/login');
    }
  }

  onResetPassword(): void {
    if (!this.form.valid) {
      alert('Por favor, complete el formulario correctamente');
      return;
    }

    if (this.form.value.newPassword !== this.form.value.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      userData.password = btoa(this.form.value.newPassword || '');
      localStorage.setItem('user', JSON.stringify(userData));
      alert('Contraseña restablecida con éxito');
      this.functionService.clearToken();
      this.functionService.navigateTo('/login');
    } catch (error) {
      alert('Error al restablecer la contraseña');
    }
  }
}
