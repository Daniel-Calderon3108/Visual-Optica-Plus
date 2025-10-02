import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { FunctionService } from 'src/app/shared/services/function/function.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule, FormsModule, ReactiveFormsModule]
})
export class LoginPage implements OnInit {

  form = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  constructor(private functionService: FunctionService) { }

  ngOnInit() {
  }

  navigateToRegister = () => this.functionService.navigateTo('/register'); 

  onLogin() {
    if(this.form.valid) {
        let userData = JSON.parse(localStorage.getItem('user' ) || '{}');


      let storedUser = userData.user;
      let storedPassword = userData.password;

      let encryptedPassword = btoa(this.form.value.password ? this.form.value.password : "");

      if(storedUser === this.form.value.user && storedPassword === encryptedPassword) {
        this.functionService.navigateTo('/welcome');
        return;
      }
      alert('Usuario y/o contraseña incorrectos');
      return;
    }
    alert('Todos los campos son obligatorios');
    this.form.reset();
  }
}
