import {Routes} from "@angular/router";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";

export const appRoutes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'auth',
    loadComponent: () => import('./pages/auth/containers/authentication/authentication.component')
      .then(m => m.AuthenticationComponent)
  },
  {
    path: '', component: MainLayoutComponent, children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./pages/home/home.routes').then((m) => m.HOME_ROUTES)
      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./pages/dashboard/dashboard.routes').then((m) => m.DASHBOARD_ROUTES)
      }
    ]
  },
  {path: '**', redirectTo: 'home'}
]
