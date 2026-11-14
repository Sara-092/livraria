import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonButton, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    RouterLink,
  ],
})
export class FavoritosPage {
  favoritos: any[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  // roda toda vez que a página aparece, assim a lista fica sempre atualizada
  ionViewWillEnter() {
    const lista = JSON.parse(localStorage.getItem('favoritos') || '[]');
    // ignora favoritos antigos salvos em formato errado
    this.favoritos = lista.filter((f: any) => f.key && f.title);
    this.cd.detectChanges();
  }

  remover(key: string) {
    this.favoritos = this.favoritos.filter((f) => f.key !== key);
    localStorage.setItem('favoritos', JSON.stringify(this.favoritos));
    this.cd.detectChanges();
  }
}