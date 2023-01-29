import {ComponentStore} from "@ngrx/component-store";
import {FavoritesModel} from "../models/favorites.model";
import {FavoritesService} from "./favorites.service";
import {Injectable} from "@angular/core";
import {catchError, concatMap, EMPTY, Observable, of, shareReplay, switchMap, tap} from "rxjs";
import {AuthStore} from "../../../core/services/auth.store";

export interface FavoritesState {
  data: FavoritesModel[];
  packageIds: number[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: FavoritesState = {
  data: [],
  packageIds: [],
  loading: false,
  loaded: false,
  error: null,
  total: 0,
}

@Injectable({
  providedIn: "root"
})
export class FavoritesStore extends ComponentStore<FavoritesState> {

  favoritePackagesIds$ = this.select((state) => state.packageIds)

  vm$ = this.authStore.user$.pipe(switchMap((user)=>
      user ?
        this.favoritesService.getFavorites().pipe(
         tap(res => {
           console.log(res, 'IM HEREEEE!!!!!!!');
           const ids: number[] = [];
           res.forEach((favorite)=>{
             ids.push(favorite.packageId);
           })
           this.patchState({
             packageIds: ids
           })
         })
        )
        : of(null)
    ),
    shareReplay(1)
  )

  constructor(private favoritesService: FavoritesService, private authStore: AuthStore) {
    super(initialState);

    this.state$.subscribe(console.log);
  }

  loadFavorites = this.effect((_$) =>
    _$.pipe(
      switchMap((_) => {
        this.patchState({
          data: [],
          loading: true,
          loaded: false,
          error: null,
        });
        return this.favoritesService.getFavorites().pipe(
          tap((res) => {
            console.log(res, 'HEREEEEEEEEE!!!1 LOADDD');
            this.patchState({
              data: res,
              loading: false,
              loaded: true,
              total: res.length
            });
          }),
          catchError((err) => {
            this.patchState({
              data: [],
              loading: false,
              loaded: false,
              error: err.message,
            });
            return EMPTY;
          })
        );
      })
    )
  );

  // markAsFavorite = this.effect((favorite$: Observable<number>) => favorite$.pipe(
  //   switchMap(favorite => this.favoritesService.postFavorite(favorite).pipe(
  //     tap((res)=>{
  //       console.log(res);
  //
  //     }),
  //     catchError(err => {
  //       console.error('Cannot add favorite', err);
  //       return EMPTY;
  //     })
  //   ))
  // ));

  setFavorite = this.effect((favorite$: Observable<number>) => favorite$.pipe(
    switchMap(favorite => this.favoritesService.postFavorite(favorite).pipe(
      concatMap(() => {
        return this.favoritesService.getFavorites().pipe(
          tap((res) => {
            // this.authStore.patchState({
            //   favorites: res
            // })
            const ids: number[] = [];
            res.forEach((favorite)=>{
              ids.push(favorite.packageId);
            })
            this.patchState({
              packageIds: ids
            })
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

}
