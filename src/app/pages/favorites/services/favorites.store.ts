import {ComponentStore} from "@ngrx/component-store";
import {FavoritesModel} from "../models/favorites.model";
import {FavoritesService} from "./favorites.service";
import {Injectable} from "@angular/core";
import {catchError, EMPTY, switchMap, tap} from "rxjs";

export interface FavoritesState {
  data: FavoritesModel[];
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: FavoritesState = {
  data: [],
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

}
