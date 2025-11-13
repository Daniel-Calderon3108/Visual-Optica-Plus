import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonContent } from '@ionic/angular/standalone';
import { FunctionService } from 'src/app/shared/services/function/function.service';
import { RolesService } from 'src/app/shared/services/roles.service';

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

  constructor(
    private functionService: FunctionService,
    private rolesService: RolesService
  ) { }

  ngOnInit() {
  }

  navigateTo = (url : string) => this.functionService.navigateTo(url); 

  onLogin() {
    if(this.form.valid) {
      // Buscar usuario en la lista de usuarios
      const users = this.rolesService.getAllUsers();
      const user = users.find(u => u.user === this.form.value.user);
      
      if (!user) {
        // Fallback: buscar en localStorage (para compatibilidad con usuarios antiguos)
        let userData = JSON.parse(localStorage.getItem('user') || '{}');
        let storedUser = userData.user;
        let storedPassword = userData.password;
        let encryptedPassword = btoa(this.form.value.password ? this.form.value.password : "");

        if(storedUser === this.form.value.user && storedPassword === encryptedPassword) {
          // Si no tiene rol, asignar 'user' por defecto
          if (!userData.role) {
            userData.role = 'user';
            localStorage.setItem('user', JSON.stringify(userData));
            this.rolesService.saveUser(userData);
          }
          
          // Generar token de autenticación
          this.functionService.generateToken().then(() => {
            this.functionService.navigateTo('/welcome');
          });
          return;
        }
        alert('Usuario y/o contraseña incorrectos');
        return;
      }

      // Verificar contraseña
      let encryptedPassword = btoa(this.form.value.password ? this.form.value.password : "");
      if(user.password === encryptedPassword) {
        // Asegurar que el usuario tenga todos los campos necesarios, especialmente el rol
        const userToSave = {
          ...user,
          role: user.role || 'user' // Asegurar que siempre tenga un rol
        };
        
        // Guardar usuario actual
        localStorage.setItem('user', JSON.stringify(userToSave));
        this.rolesService.saveUser(userToSave);
        
        // Log para debug
        console.log('Login - User saved:', userToSave);
        console.log('Login - Is admin:', userToSave.role === 'admin');
        
        // Generar token de autenticación
        this.functionService.generateToken().then(() => {
          this.functionService.navigateTo('/welcome');
        });
        return;
      }
      
      alert('Usuario y/o contraseña incorrectos');
      return;
    }
    alert('Todos los campos son obligatorios');
    this.form.reset();
  }
}
