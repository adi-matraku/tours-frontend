import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {map, Observable, pluck} from 'rxjs';
import {AuthStore} from "../services/auth.store";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authStore: AuthStore, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot): Observable<boolean> {

    return this.authStore.user$.pipe(
      pluck('role'),
      map(role => {
        console.log(route);
        if (route.data['role'].includes(role)) {
          return true;
        }
        this.router.navigateByUrl('home').then();
        return false;
      })
    );

  }

}
