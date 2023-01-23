import {Route} from "@angular/router";
import {RoleGuard} from "../../core/guards/role.guard";
import {AuthGuard} from "../../core/guards/auth.guard";

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    canActivate: [AuthGuard, RoleGuard],
    data: {
      role: ['Admin', 0]
    },
    loadComponent: () => import('./containers/dashboard/dashboard.component')
      .then((m) => m.DashboardComponent)
  },
]
