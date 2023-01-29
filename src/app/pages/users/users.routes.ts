import {Route} from "@angular/router";
import {authGuard} from "../../core/guards/auth.guard";
import {RoleGuard} from "../../core/guards/role.guard";

const USERS_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [authGuard, RoleGuard],
    data: {
      role: ['Admin', 0]
    },
    loadComponent: () => import('./containers/users/users.component')
  },
]

export default USERS_ROUTES;
