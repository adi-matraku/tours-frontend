import {Route} from "@angular/router";
import {nonAuthGuard} from "../../core/guards/non-auth.guard";

const AUTH_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [nonAuthGuard],
    loadComponent: () => import('./containers/authentication/authentication.component')
  },
  {
    path: 'register',
    canActivate: [nonAuthGuard],
    loadComponent: () => import('./containers/registration/registration.component')
  },
]

export default AUTH_ROUTES;
