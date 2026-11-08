import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonSpinner, IonChip, IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonSpinner, IonChip, IonButton,
  ],
})
export class DetalhesPage implements OnInit {
  id = '';
  livro: any = null;
  carregando = true;
  favorito = false;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id') ?? '';

    
    const lista = JSON.parse(localStorage.getItem('favoritos') || '[]');
    this.favorito = lista.some((f: any) => f.id === this.id);

    
    this.http.get<any>(`https://openlibrary.org/works/${this.id}.json`).subscribe({
      next: (res) => {
        let descricao = 'Sem descrição disponível.';
        if (typeof res.description === 'string') {
          descricao = res.description;
        } else if (res.description?.value) {
          descricao = res.description.value;
        }

        this.livro = {
          titulo: res.title,
          descricao: descricao,
          data: res.first_publish_date ?? 'Não informada',
          assuntos: (res.subjects ?? []).slice(0, 8),
          capa: res.covers?.[0]
            ? `https://covers.openlibrary.org/b/id/${res.covers[0]}-L.jpg`
            : '',
        };
        this.carregando = false;
      },
      error: () => (this.carregando = false),
    });
  }

  alternarFavorito() {
    let lista = JSON.parse(localStorage.getItem('favoritos') || '[]');

    if (this.favorito) {
      lista = lista.filter((f: any) => f.id !== this.id);
    } else {
      lista.push({ id: this.id, titulo: this.livro.titulo, capa: this.livro.capa });
    }

    localStorage.setItem('favoritos', JSON.stringify(lista));
    this.favorito = !this.favorito;
  }
}
