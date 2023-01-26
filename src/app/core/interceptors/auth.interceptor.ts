import {HttpHandlerFn, HttpInterceptorFn, HttpRequest} from "@angular/common/http";
import {inject} from "@angular/core";
import {catchError, switchMap, take, throwError} from "rxjs";
import {AuthStore} from "../services/auth.store";
import {AuthService} from "../../pages/auth/services/auth.service";

export const authInterceptor: HttpInterceptorFn = (request: HttpRequest<any>, next: HttpHandlerFn) => {
  const authStore = inject(AuthStore)
  const authService = inject(AuthService);

  return authStore.token$.pipe(
    take(1),
    switchMap(token => {
      if (token) {
        let modifiedReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
        return next(modifiedReq).pipe(catchError(err => {
          if (err.status === 403) {
            authStore.setInitialState();
            authService.logout();
          }
          return throwError(err);
        }))
      }
      return next(request)
    }))

}

