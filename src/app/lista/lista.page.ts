import { Component, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonSearchbar, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent,
    RouterLink,
  ],
})
export class ListaPage {
  todos: any[] = [];
  livros: any[] = [];

  constructor(private cd: ChangeDetectorRef) {}

  
  ionViewWillEnter() {
    const nomes = ['fantasia', 'romance', 'ficcao', 'distopia', 'terror'];
    const juntos: any[] = [];

    for (const nome of nomes) {
      const lista = JSON.parse(localStorage.getItem(nome) || '[]');
      juntos.push(...lista);
    }

  
    const vistos = new Set<string>();
    this.todos = juntos.filter((l) => !vistos.has(l.key) && vistos.add(l.key));
    this.livros = this.todos;
    this.cd.detectChanges();
  }

  filtrar(evento: any) {
    const texto = (evento.target.value || '').toLowerCase();
    this.livros = this.todos.filter(
      (l) =>
        (l.title ?? '').toLowerCase().includes(texto) ||
        (l.authors?.[0]?.name ?? '').toLowerCase().includes(texto)
    );
  }
}