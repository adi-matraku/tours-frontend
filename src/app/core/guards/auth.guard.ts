import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {map, Observable} from 'rxjs';
import {AuthStore} from "../services/auth.store";

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authStore: AuthStore, private router: Router) {}

  canActivate(): Observable<boolean> {
    return this.authStore.token$.pipe(
      map(token => {
        if (token) {
          return true;
        }
        this.router.navigateByUrl('auth/login').then();
        return false;
      })
    );
  }
}
