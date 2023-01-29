import {Route} from "@angular/router";

const HOME_ROUTES: Route[] = [
  {
    path: '',
    loadComponent: () => import('./containers/home/home.component')
  },
]

export default HOME_ROUTES;
