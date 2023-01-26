import {Route} from "@angular/router";
import {AuthGuard} from "../../core/guards/auth.guard";

const PROFILE_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadComponent: () => import('./containers/profile/profile.component')
  },
]

export default PROFILE_ROUTES;
