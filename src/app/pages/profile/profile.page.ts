import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonItem, IonLabel, IonCardTitle, IonCardContent, IonList, IonIcon, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonButton, IonIcon, IonList, IonCardContent, IonCardTitle, IonLabel, IonItem, IonCardHeader, IonCard, IonContent, IonHeader, IonCard, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class ProfilePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
