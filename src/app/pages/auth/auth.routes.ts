import {Route} from "@angular/router";
import {NonAuthGuard} from "../../core/guards/non-auth.guard";

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [NonAuthGuard],
    loadComponent: () => import('./containers/authentication/authentication.component')
      .then((m) => m.AuthenticationComponent)
  },
  {
    path: 'register',
    canActivate: [NonAuthGuard],
    loadComponent: () => import('./containers/registration/registration.component')
      .then((m) => m.RegistrationComponent)
  },
]
