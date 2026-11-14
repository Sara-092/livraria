import { Routes } from '@angular/router';

import { HomePage } from './home/home.page';
import { ListaPage } from './lista/lista.page';
import { DetalhesPage } from './detalhes/detalhes.page';
import { FavoritosPage } from './favoritos/favoritos.page';

export const routes: Routes = [
  {
    path: 'home',
    component: HomePage
  },
  {
    path: 'lista',
    component: ListaPage
  },
  {
    path: 'detalhes/:id',
    component: DetalhesPage
  },
  {
    path: 'favoritos',
    component: FavoritosPage
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  }
];