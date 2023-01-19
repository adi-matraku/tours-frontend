import {Route} from "@angular/router";

export const HOME_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./containers/home/home.component')
      .then((m) => m.HomeComponent)
  },
]
