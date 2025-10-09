import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { FunctionService } from 'src/app/shared/services/function/function.service';

@Component({
  selector: 'app-forget.password',
  templateUrl: './forget.password.page.html',
  styleUrls: ['./forget.password.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class ForgetPasswordPage implements OnInit {

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  navigateTo = (url : string, data : string = "") => this.functionService.navigateTo(url, data);

  constructor(private functionService : FunctionService) { }

  ngOnInit() {
  }

  async onRecoverPassword() {
    if (this.form.valid) {
      let userData = JSON.parse(localStorage.getItem('user') || '{}');

      let storedUser = userData.user;
      let storedEmail = userData.email;
      if (storedUser === this.form.value.user && storedEmail === this.form.value.email) {
        this.navigateTo('/reset-password', await this.functionService.generateToken());
        return;
      }
    }
    alert('Usuario y/o correo incorrectos');
  }
}