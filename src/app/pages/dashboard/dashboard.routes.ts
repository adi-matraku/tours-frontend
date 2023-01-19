import {Route} from "@angular/router";

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./containers/dashboard/dashboard.component')
      .then((m) => m.DashboardComponent)
  },
]
