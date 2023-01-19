import {Routes} from "@angular/router";
import {MainLayoutComponent} from "./layout/main-layout/main-layout.component";
import {HOME_ROUTES} from "./pages/home/home.routes";
import {DASHBOARD_ROUTES} from "./pages/dashboard/dashboard.routes";

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
        children: [
          ...HOME_ROUTES
        ]
      },
      {
        path: 'dashboard',
        children: [
          ...DASHBOARD_ROUTES
        ]
      }
    ]
  }
]
