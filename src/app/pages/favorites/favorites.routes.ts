import {Route} from "@angular/router";
import {AuthGuard} from "../../core/guards/auth.guard";

export const FAVORITE_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('./containers/favorites/favorites.component')
      .then((m) => m.FavoritesComponent)
  },
]
