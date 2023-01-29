import {Route} from "@angular/router";
import {authGuard} from "../../core/guards/auth.guard";

const PROFILE_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./containers/profile/profile.component')
  },
]

export default PROFILE_ROUTES;
