import {ComponentStore} from "@ngrx/component-store";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {AuthService} from "../../pages/auth/services/auth.service";
import {UserCredentials} from "../../pages/auth/models/user-credentials.model";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserRegistrationModel} from "../../pages/auth/models/user-registration.model";

export interface UserModel {
  id: number | null;
  name: string | null;
  email: string | null;
  role: string | null;
  token?: string | null;
  imageUrl?: string | null;
}

export interface AuthState {
  user: UserModel | null,
  token: string | null;
  authenticating: boolean;
  authenticated: boolean;
  loginError: string | null;
  registrationError: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  authenticating: false,
  authenticated: false,
  loginError: null,
  registrationError: null
}

@Injectable({
  providedIn: "root"
})
export class AuthStore extends ComponentStore<AuthState> {

  token$ = this.select((state) => state.token)

  constructor(private authService: AuthService, private router: Router) {
    super(initialState);

    this.state$.subscribe(console.log)
  }

  get state() {
    return this.get(s => s);
  }

  setInitialState = () => this.setState(initialState);

  setNewState = (data: AuthState) => this.patchState(data);

  setToken = (token: string) => this.patchState({
    token: token
  });

  login = this.effect((credentials$: Observable<UserCredentials>) =>
    credentials$.pipe(
      tap(() => this.patchState({
        user: null,
        token: null,
        authenticating: true,
        authenticated: false,
        loginError: null,
      })),
      switchMap((credentials) =>
        this.authService.login(credentials).pipe(
          tap((res) => {
            console.log(res);
            this.patchState({
              user: res,
              token: res.token,
              authenticating: false,
              authenticated: true,
              loginError: null,
            });
            if(res.token) localStorage.setItem('token', res.token)
            this.router.navigateByUrl('home').then();
          }),
          catchError((err) => {
            this.patchState({
              user: null,
              token: null,
              authenticating: false,
              authenticated: false,
              loginError: err.error,
            });
            return EMPTY;
          })
        )
      )
    )
  )

  register = this.effect((credentials$: Observable<UserRegistrationModel>) =>
    credentials$.pipe(
      tap(() => this.patchState({
        user: null,
        token: null,
        authenticating: true,
        authenticated: false,
        registrationError: null,
      })),
      switchMap((credentials) =>
        this.authService.register(credentials).pipe(
          tap((res) => {
            this.patchState({
              user: res,
              token: res.token,
              authenticating: false,
              authenticated: true,
              registrationError: null,
            });
            if(res.token) localStorage.setItem('token', res.token)
            this.router.navigateByUrl('home').then();
          }),
          catchError((err) => {
            this.patchState({
              user: null,
              token: null,
              authenticating: false,
              authenticated: false,
              registrationError: err.error,
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
