import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonSpinner,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonSpinner, RouterLink,
  ],
})
export class HomePage implements OnInit {
  livros: any[] = [];
  carregando = true;

  constructor(private http: HttpClient) {}

  ngOnInit() {
   
    this.http.get<any>('https://openlibrary.org/subjects/fiction.json?limit=6').subscribe({
      next: (res) => {
        this.livros = res.works.map((w: any) => ({
          id: w.key.replace('/works/', ''),
          titulo: w.title,
          autor: w.authors?.[0]?.name ?? 'Autor desconhecido',
          capa: w.cover_id ? `https://covers.openlibrary.org/b/id/${w.cover_id}-L.jpg` : '',
        }));
        this.carregando = false;
      },
      error: () => (this.carregando = false),
    });
  }
}
