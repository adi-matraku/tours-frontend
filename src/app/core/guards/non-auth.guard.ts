import {inject} from '@angular/core';
import {CanActivateFn, Router} from '@angular/router';
import {map} from 'rxjs';
import {AuthStore} from "../services/auth.store";


export const nonAuthGuard: CanActivateFn = () => {
  const authStore = inject(AuthStore);
  const router = inject(Router);

  return authStore.token$.pipe(
    map(token => {
      if (!token) {
        return true;
      }
      return router.createUrlTree(['home']);
    })
  );
}
