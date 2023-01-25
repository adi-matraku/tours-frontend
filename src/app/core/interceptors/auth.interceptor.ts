import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {catchError, Observable, switchMap, take, throwError} from "rxjs";
import {AuthStore} from "../services/auth.store";
import {AuthService} from "../../pages/auth/services/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private authStore: AuthStore, private authService: AuthService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return this.authStore.token$.pipe(
      take(1),
      switchMap(token => {
      if(token) {
        let modifiedReq = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
        return next.handle(modifiedReq).pipe(catchError(err => {
          if(err.status === 403) {
            this.authStore.setInitialState();
            this.authService.logout();
          }
          return throwError(err);
        }))
      }
      return next.handle(request)
    }))

  }
}
