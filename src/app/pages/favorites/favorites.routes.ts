import {Route} from "@angular/router";
import {authGuard} from "../../core/guards/auth.guard";

const FAVORITE_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./containers/favorites/favorites.component')
  },
]

export default FAVORITE_ROUTES;
