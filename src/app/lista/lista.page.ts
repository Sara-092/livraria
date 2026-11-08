import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSearchbar, IonButton, IonCard, IonCardHeader, IonCardTitle,
  IonCardSubtitle, IonCardContent, IonSpinner,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonSearchbar, IonButton, IonCard, IonCardHeader, IonCardTitle,
    IonCardSubtitle, IonCardContent, IonSpinner, FormsModule, RouterLink,
  ],
})
export class ListaPage implements OnInit {
  termo = 'tolkien';
  livros: any[] = [];
  carregando = false;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.buscar();
  }

  buscar() {
    this.carregando = true;
  
    this.http
      .get<any>(`https://openlibrary.org/search.json?q=${this.termo}&lang=pt&limit=20`)
      .subscribe({
        next: (res) => {
          this.livros = res.docs.map((d: any) => ({
            id: d.key.replace('/works/', ''),
            titulo: d.title,
            autor: d.author_name?.[0] ?? 'Autor desconhecido',
            ano: d.first_publish_year ?? '—',
            capa: d.cover_i ? `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg` : '',
          }));
          this.carregando = false;
        },
        error: () => (this.carregando = false),
      });
  }
}
