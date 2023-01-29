import {ComponentStore} from "@ngrx/component-store";
import {FavoritesModel} from "../models/favorites.model";
import {FavoritesService} from "./favorites.service";
import {Injectable} from "@angular/core";
import {catchError, concatMap, EMPTY, Observable, of, switchMap, tap} from "rxjs";

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


  constructor(private favoritesService: FavoritesService) {
    super(initialState);

    this.state$.subscribe(console.log);
  }

  favoritePackagesIds$ = of([1,23,24,5]);

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
  //     concatMap(() => {
  //       return this.favoritesService.getFavorites().pipe(
  //         tap((res) => {
  //           this.patchState({
  //             packageIds: res
  //           })
  //           // localStorage.setItem('favorites', JSON.stringify(res))
  //         }),
  //         catchError((err)=> {
  //           console.error('Cannot get favorites', err);
  //           return EMPTY;
  //         })
  //       )
  //     }),
  //     catchError(err => {
  //       console.error('Cannot add favorite', err);
  //       return EMPTY;
  //     })
  //   ))
  // ));

}
