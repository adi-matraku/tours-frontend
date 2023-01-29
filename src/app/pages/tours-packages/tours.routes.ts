import {Route} from "@angular/router";
import {authGuard} from "../../core/guards/auth.guard";
import {RoleGuard} from "../../core/guards/role.guard";

const TOURS_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [authGuard, RoleGuard],
    data: {
      role: ['Admin', 0]
    },
    loadComponent: () => import('./containers/tours-packages/tours-packages.component')
  },
]

export default TOURS_ROUTES;
