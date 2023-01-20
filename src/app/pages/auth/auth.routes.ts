import {Route} from "@angular/router";

export const AUTH_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./containers/authentication/authentication.component')
      .then((m) => m.AuthenticationComponent)
  },
  {
    path: 'register',
    loadComponent: () => import('./containers/registration/registration.component')
      .then((m) => m.RegistrationComponent)
  },
]
