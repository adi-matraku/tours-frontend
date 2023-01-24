import {Routes} from "@angular/router";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {AuthLayoutComponent} from "./layout/auth-layout/auth-layout.component";

export const appRoutes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'auth', component: AuthLayoutComponent, children: [
      {
        path: '',
        loadChildren: () =>
          import('./pages/auth/auth.routes').then((m) => m.AUTH_ROUTES)
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
        loadChildren: () =>
          import('./pages/edit-profile/profile.routes')
            .then((m) => m.PROFILE_ROUTES)
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
