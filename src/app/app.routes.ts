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
