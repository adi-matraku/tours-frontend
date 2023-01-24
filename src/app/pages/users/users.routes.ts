import {Route} from "@angular/router";
import {AuthGuard} from "../../core/guards/auth.guard";
import {RoleGuard} from "../../core/guards/role.guard";

export const USERS_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      role: ['Admin', 0]
    },
    loadComponent: () => import('./containers/users/users.component')
      .then((m) => m.UsersComponent)
  },
]
