import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: 'lista',
    loadComponent: () => import('./lista/lista.page').then((m) => m.ListaPage),
  },
  {
    path: 'detalhes/:id',
    loadComponent: () => import('./detalhes/detalhes.page').then((m) => m.DetalhesPage),
  },
  {
    path: 'favoritos',
    loadComponent: () => import('./favoritos/favoritos.page').then((m) => m.FavoritosPage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
