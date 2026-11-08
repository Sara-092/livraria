import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardContent, RouterLink,
  ],
})
export class FavoritosPage {
  favoritos: any[] = [];

  
  ionViewWillEnter() {
    this.favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
  }

  remover(id: string) {
    this.favoritos = this.favoritos.filter((f) => f.id !== id);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
  }
}
