import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent } from '@ionic/angular/standalone';
import { FunctionService } from 'src/app/shared/services/function/function.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule]
})
export class SplashPage implements OnInit, OnDestroy {

  timer: any; // Timer para la pantalla de carga

  constructor(private functionService: FunctionService) { }

  ngOnInit() {
    this.navigateToLogin();
  }

  ngOnDestroy() {
    if (this.timer) clearTimeout(this.timer);
  }

  navigateToLogin() {
    this.timer = setTimeout(() => this.functionService.navigateTo('/login'), 3000); // Espera 3 segundos antes de navegar
  }
}
