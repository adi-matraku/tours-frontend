import {Route} from "@angular/router";
import {AuthGuard} from "../../core/guards/auth.guard";

export const PROFILE_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('./containers/profile/profile.component')
      .then((m) => m.ProfileComponent)
  },
]
