import { Component, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
  IonChip, IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton,
    IonChip, IonButton,
  ],
})
export class DetalhesPage {
  id = '';
  livro: any = null;
  favorito = false;

  constructor(private route: ActivatedRoute, private cd: ChangeDetectorRef) {}

  
  ionViewWillEnter() {
  
    this.id = this.route.snapshot.paramMap.get('id') ?? '';
    const chave = '/works/' + this.id;

    this.livro = null;
    const fontes = ['fantasia', 'romance', 'ficcao', 'distopia', 'terror', 'favoritos'];
    for (const nome of fontes) {
      const lista = JSON.parse(localStorage.getItem(nome) || '[]');
      const achado = lista.find((l: any) => l.key === chave);
      if (achado) {
        this.livro = achado;
        break;
      }
    }

    const favoritos = JSON.parse(localStorage.getItem('favoritos') || '[]');
    this.favorito = favoritos.some((f: any) => f.key === chave);
    this.cd.detectChanges();
  }

  alternarFavorito() {
    let lista = JSON.parse(localStorage.getItem('favoritos') || '[]');

    if (this.favorito) {
      lista = lista.filter((f: any) => f.key !== this.livro.key);
    } else {
      lista.push(this.livro);
    }

    localStorage.setItem('favoritos', JSON.stringify(lista));
    this.favorito = !this.favorito;
    this.cd.detectChanges();
  }
}