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
        loadChildren: () =>
          import('./pages/home/home.routes')
            .then((m) => m.HOME_ROUTES)
      },
      {
        path: 'profile',
        loadChildren: () => import('./pages/edit-profile/profile.routes')
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('./pages/favorites/favorites.routes')
            .then((m) => m.FAVORITE_ROUTES)
      },
      {
        path: 'tours-packages',
        loadChildren: () =>
          import('./pages/tours-packages/tours.routes')
            .then((m) => m.TOURS_ROUTES)
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./pages/users/users.routes')
            .then((m) => m.USERS_ROUTES)
      },
    ]
  },
  {path: '**', redirectTo: 'home'}
]
