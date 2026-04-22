import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'weather',
    loadComponent: () => import('./weather/weather.page').then( m => m.WeatherPage)
  },
  {
    path: 'news',
    loadComponent: () => import('./news/news.page').then( m => m.NewsPage)
  },
  {
    path: 'maintenance',
    loadComponent: () => import('./maintenance/maintenance.page').then( m => m.MaintenancePage)
  },
  {
    path: 'trips',
    loadComponent: () => import('./trips/trips.page').then( m => m.TripsPage)
  },
  {
    path: 'garage',
    loadComponent: () => import('./garage/garage.page').then( m => m.GaragePage)
  },

];
