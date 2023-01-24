import {Route} from "@angular/router";
import {AuthGuard} from "../../core/guards/auth.guard";
import {RoleGuard} from "../../core/guards/role.guard";

export const TOURS_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      role: ['Admin', 0]
    },
    loadComponent: () => import('./containers/tours-packages/tours-packages.component')
      .then((m) => m.ToursPackagesComponent)
  },
]
