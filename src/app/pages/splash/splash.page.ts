import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { FunctionService } from 'src/app/shared/services/function/function.service';
import { AuthService } from 'src/app/shared/services/auth/auth';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonContent, CommonModule]
})
export class SplashPage implements OnInit, OnDestroy {

  private timer?: ReturnType<typeof setTimeout>;

  constructor(
    private functionService: FunctionService,
    private authService: AuthService,
    private router: Router
  ) { }

  private readonly SPLASH_DELAY = 3000;

  ngOnInit(): void {
    this.navigateAfterSplash();
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  private navigateAfterSplash(): void {
    this.timer = setTimeout(() => {
      if (this.authService.isAuthenticated()) {
        this.router.navigate(['/welcome'], { replaceUrl: true });
      } else {
        this.router.navigate(['/login'], { replaceUrl: true });
      }
    }, this.SPLASH_DELAY);
  }
}
