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
    newPassword: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('', [Validators.required]),
  });

  constructor(private activatedRoute : ActivatedRoute, private functionService : FunctionService) { }

  ngOnInit() {
    const token = this.activatedRoute.snapshot.paramMap.get('token') || '';
    if (token !== this.functionService.token) {
      alert('Token inválido o expirado');
      this.functionService.navigateTo('/login');
    }
  }

  onResetPassword() {
    if (this.form.valid) {
      if (this.form.value.newPassword === this.form.value.confirmPassword) {
        let userData = JSON.parse(localStorage.getItem('user') || '{}');
        userData.password = btoa(this.form.value.newPassword || '');
        localStorage.setItem('user', JSON.stringify(userData));
        alert('Contraseña restablecida con éxito');
        this.functionService.token = '';
        this.functionService.navigateTo('/login');
        return;
      } 
      alert('Las contraseñas no coinciden');
      return;
    }
    alert('Por favor, complete el formulario correctamente');
  }
}
