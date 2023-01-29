import {Routes} from "@angular/router";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";

export const appRoutes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./layout/auth-layout/auth-layout.component'),
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/auth/auth.routes')
      },
    ]
  },
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: 'home',
        loadChildren: () => import('./pages/home/home.routes')
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/edit-profile/profile.routes')
      },
      {
        path: 'favorites',
        loadChildren: () => import('./pages/favorites/favorites.routes')
      },
      {
        path: 'tours-packages',
        loadChildren: () => import('./pages/tours-packages/tours.routes')
      },
      {
        path: 'users',
        loadChildren: () => import('./pages/users/users.routes')
      },
    ]
  },
  {path: '**', redirectTo: 'home'}
]
