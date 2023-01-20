import {ComponentStore} from "@ngrx/component-store";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {AuthService} from "../../pages/auth/services/auth.service";
import {UserCredentials} from "../../pages/auth/models/user-credentials.model";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";

export interface UserModel {
  id: number;
  name: string;
  email: string;
  role: string;
  token: string;
}

export interface AuthState {
  user: UserModel | null,
  authenticating: boolean;
  authenticated: boolean;
  error: string | null;
}

export const initialState: AuthState = {
  user: null,
  authenticating: false,
  authenticated: false,
  error: null
}

@Injectable()
export class AuthStore extends ComponentStore<AuthState> {

  constructor(private authService: AuthService, private router: Router) {
    super(initialState);

    this.state$.subscribe(console.log)
  }

  get state() {
    return this.get(s => s);
  }

  login = this.effect((credentials$: Observable<UserCredentials>) =>
    credentials$.pipe(
      tap(() => this.setState({
        user: null,
        authenticating: true,
        authenticated: false,
        error: null,
      })),
      switchMap((credentials) =>
        this.authService.login(credentials).pipe(
          tap((res) => {
            console.log(res);
            this.patchState({
              user: res,
              authenticating: false,
              authenticated: true,
              error: null,
            });
            localStorage.setItem('token', res.token)
            this.router.navigateByUrl('home');
          }),
          catchError((err) => {
            this.patchState({
              user: null,
              authenticating: false,
              authenticated: false,
              error: null,
            });
            return EMPTY;
          })
        )
      )
    )
  )

  // loadFirstCard = this.effect((_$) =>
  //   _$.pipe(
  //     switchMap((_) => {
  //       this.patchState({
  //         user: null,
  //         authenticating: true,
  //         authenticated: false,
  //         error: null,
  //       });
  //       return this.authService.login().pipe(
  //         tap((res) => {
  //           this.patchState({
  //             user: res,
  //             authenticating: false,
  //             authenticated: true,
  //             error: null,
  //           });
  //         }),
  //         catchError((err) => {
  //           this.patchState({
  //             user: null,
  //             authenticating: false,
  //             authenticated: false,
  //             error: null,
  //           });
  //           return EMPTY;
  //         })
  //       );
  //     })
  //   )
  // );
}
