import { provideRouter, RouterConfig } from '@angular/router';

/**IMPORTS HEROES */
import { HeroesRoutes } from './heroes/heroes.routes';
import { HeroesComponent }     from './heroes/heroes.component';
import { HeroDetailComponent }   from './heroes/hero-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

/**IMPORTS DENTAL-SOFT */
//import { AppDentalSoftComponent } from './app.component';

export const routes: RouterConfig = [
  { path: '', component: DashboardComponent}  , //INDEX, deafault
  { path: 'dashboard', component: DashboardComponent}  ,
  ...HeroesRoutes,
  
]; 

export const APP_ROUTER_PROVIDERS = [
  provideRouter(routes)
];