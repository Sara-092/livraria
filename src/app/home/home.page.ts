import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonChip,
  IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonChip,
    IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, RouterLink,
  ],
})
export class HomePage implements OnInit {
 
  categoria = 'fantasia';

  categorias = [
    { id: 'fantasia', nome: ' Fantasia' },
    { id: 'romance', nome: ' Romance' },
    { id: 'ficcao', nome: ' Ficção científica' },
    { id: 'distopia', nome: ' Distopia' },
    { id: 'terror', nome: ' Terror' },
  ];


  livrosPorCategoria: any = {
    fantasia: [],
    romance: [],
    ficcao: [],
    distopia: [],
    terror: [],
  };

  
  campos = 'key,title,author_name,cover_i,first_publish_year,subject,edition_count,number_of_pages_median,ratings_average,language,first_sentence';

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit() {
    this.getFantasia();
    this.getRomance();
    this.getFiccao();
    this.getDistopia();
    this.getTerror();
  }

  // GET fantasia
  getFantasia() {
    fetch(`https://openlibrary.org/search.json?subject=fantasy&sort=editions&limit=20&fields=${this.campos}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.livrosPorCategoria.fantasia = data.docs
          .filter((d: any) => d.cover_i)
          .slice(0, 6)
          .map((d: any) => ({
            key: d.key,
            title: d.title,
            authors: [{ name: d.author_name?.[0] ?? 'Autor desconhecido' }],
            cover_id: d.cover_i,
            first_publish_year: d.first_publish_year,
            subject: d.subject?.slice(0, 8),
            edition_count: d.edition_count,
            pages: d.number_of_pages_median,
            rating: d.ratings_average,
            language: d.language,
            first_sentence: d.first_sentence?.[0],
          }))
        localStorage.setItem('fantasia', JSON.stringify(this.livrosPorCategoria.fantasia))
        this.cd.detectChanges()
      })
      .catch(e => {
        console.log(e)
      })
  }

  // GET  romance
  getRomance() {
    fetch(`https://openlibrary.org/search.json?subject=romance&sort=editions&limit=20&fields=${this.campos}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.livrosPorCategoria.romance = data.docs
          .filter((d: any) => d.cover_i)
          .slice(0, 6)
          .map((d: any) => ({
            key: d.key,
            title: d.title,
            authors: [{ name: d.author_name?.[0] ?? 'Autor desconhecido' }],
            cover_id: d.cover_i,
            first_publish_year: d.first_publish_year,
            subject: d.subject?.slice(0, 8),
            edition_count: d.edition_count,
            pages: d.number_of_pages_median,
            rating: d.ratings_average,
            language: d.language,
            first_sentence: d.first_sentence?.[0],
          }))
        localStorage.setItem('romance', JSON.stringify(this.livrosPorCategoria.romance))
        this.cd.detectChanges()
      })
      .catch(e => {
        console.log(e)
      })
  }

  // GET ficção científica
  getFiccao() {
    fetch(`https://openlibrary.org/search.json?subject=science%20fiction&sort=editions&limit=20&fields=${this.campos}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.livrosPorCategoria.ficcao = data.docs
          .filter((d: any) => d.cover_i)
          .slice(0, 6)
          .map((d: any) => ({
            key: d.key,
            title: d.title,
            authors: [{ name: d.author_name?.[0] ?? 'Autor desconhecido' }],
            cover_id: d.cover_i,
            first_publish_year: d.first_publish_year,
            subject: d.subject?.slice(0, 8),
            edition_count: d.edition_count,
            pages: d.number_of_pages_median,
            rating: d.ratings_average,
            language: d.language,
            first_sentence: d.first_sentence?.[0],
          }))
        localStorage.setItem('ficcao', JSON.stringify(this.livrosPorCategoria.ficcao))
        this.cd.detectChanges()
      })
      .catch(e => {
        console.log(e)
      })
  }

  // GET distopia
  getDistopia() {
    fetch(`https://openlibrary.org/search.json?q=subject%3Adystopia%20OR%20subject%3Adystopian&sort=editions&limit=20&fields=${this.campos}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.livrosPorCategoria.distopia = data.docs
          .filter((d: any) => d.cover_i)
          .slice(0, 6)
          .map((d: any) => ({
            key: d.key,
            title: d.title,
            authors: [{ name: d.author_name?.[0] ?? 'Autor desconhecido' }],
            cover_id: d.cover_i,
            first_publish_year: d.first_publish_year,
            subject: d.subject?.slice(0, 8),
            edition_count: d.edition_count,
            pages: d.number_of_pages_median,
            rating: d.ratings_average,
            language: d.language,
            first_sentence: d.first_sentence?.[0],
          }))
        localStorage.setItem('distopia', JSON.stringify(this.livrosPorCategoria.distopia))
        this.cd.detectChanges()
      })
      .catch(e => {
        console.log(e)
      })
  }

  // GET terror
  getTerror() {
    fetch(`https://openlibrary.org/search.json?subject=horror&sort=editions&limit=20&fields=${this.campos}`)
      .then(response => {
        return response.json()
      })
      .then(data => {
        this.livrosPorCategoria.terror = data.docs
          .filter((d: any) => d.cover_i)
          .slice(0, 6)
          .map((d: any) => ({
            key: d.key,
            title: d.title,
            authors: [{ name: d.author_name?.[0] ?? 'Autor desconhecido' }],
            cover_id: d.cover_i,
            first_publish_year: d.first_publish_year,
            subject: d.subject?.slice(0, 8),
            edition_count: d.edition_count,
            pages: d.number_of_pages_median,
            rating: d.ratings_average,
            language: d.language,
            first_sentence: d.first_sentence?.[0],
          }))
        localStorage.setItem('terror', JSON.stringify(this.livrosPorCategoria.terror))
        this.cd.detectChanges()
      })
      .catch(e => {
        console.log(e)
      })
  }
}