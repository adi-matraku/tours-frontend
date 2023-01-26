import {ComponentStore} from "@ngrx/component-store";
import {catchError, concatMap, EMPTY, Observable, switchMap, tap} from "rxjs";
import {AuthService} from "../../pages/auth/services/auth.service";
import {UserCredentials} from "../../pages/auth/models/user-credentials.model";
import {Injectable} from "@angular/core";
import {Router} from "@angular/router";
import {UserRegistrationModel} from "../../pages/auth/models/user-registration.model";
import {UserModel} from "../../shared/models/user.model";
import {FavoritesService} from "../../pages/favorites/services/favorites.service";
import {FavoritesModel} from "../../pages/favorites/models/favorites.model";

export interface AuthState {
  user: UserModel | null,
  token: string | null;
  favorites: FavoritesModel[];
  authenticating: boolean;
  authenticated: boolean;
  loginError: string | null;
  registrationError: string | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  favorites: [],
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
  user$ = this.select((state) => state.user)

  // vm$ = this.user$.pipe(
  //   if(user) {
  //     this.favoritesService.getFavorites();
  //   }
  // )

  constructor(private authService: AuthService, private router: Router, private favoritesService: FavoritesService) {
    super(initialState);

    this.state$.subscribe(console.log)
  }

  get state() {
    return this.get(s => s);
  }

  get favorites() {
    return this.get(s => s.favorites);
  }

  setInitialState = () => this.setState(initialState);

  setNewState = (data: Partial<AuthState>) => this.patchState(data);

  // setToken = (token: string) => this.patchState({token: token});

  // setUser = (user: UserModel) => this.patchState({user: user});

  isFavorite = (favorite: number) => {
    return this.favorites.find(item => item.packageId === favorite);
  }

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
            this.patchState({
              user: res,
              token: res.token,
              authenticating: false,
              authenticated: true,
              loginError: null,
            });
            localStorage.setItem('user', JSON.stringify(res))
            if(res.token) localStorage.setItem('token', res.token)
            this.router.navigateByUrl('home').then();
          }),
          concatMap(() => {
            return this.favoritesService.getFavorites().pipe(
              tap((res) => {
                this.patchState({
                  favorites: res
                })
                localStorage.setItem('favorites', JSON.stringify(res))
              }),
              catchError((err)=> {
                console.error('Could not get favorites' ,err);
                this.patchState({
                  favorites: []
                });
                return EMPTY;
              })
            )
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
            localStorage.setItem('user', JSON.stringify(res))
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

  setFavorite = this.effect((favorite$: Observable<number>) => favorite$.pipe(
    switchMap(favorite => this.favoritesService.postFavorite(favorite).pipe(
      concatMap(() => {
        return this.favoritesService.getFavorites().pipe(
          tap((res) => {
            this.patchState({
              favorites: res
            })
            localStorage.setItem('favorites', JSON.stringify(res))
          }),
          catchError((err)=> {
            console.error('Cannot get favorites', err);
            return EMPTY;
          })
        )
      }),
      catchError(err => {
        console.error('Cannot add favorite', err);
        return EMPTY;
      })
    ))
  ));

  removeFavorite = this.effect((favorite$: Observable<number>) => favorite$.pipe(
    switchMap(favorite => this.favoritesService.deleteFavorite(favorite).pipe(
      concatMap(() => {
        return this.favoritesService.getFavorites().pipe(
          tap((res) => {
            this.patchState({
              favorites: res
            })
            localStorage.setItem('favorites', JSON.stringify(res))
          }),
          catchError((err) => {
            console.error('Cannot get favorites', err);
            return EMPTY;
          })
        )
      }),
      catchError(err => {
        console.error('Cannot remove favorite', err);
        return EMPTY;
      })
    ))
  ));


}
