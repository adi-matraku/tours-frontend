import {ComponentStore} from "@ngrx/component-store";
import {Injectable} from "@angular/core";
import {catchError, EMPTY, Observable, of, switchMap, tap} from "rxjs";
import {PackagesService} from "./packages.service";
import {PackageDataModel} from "../../../shared/models/package-data.model";
import {PackageResponseModel} from "../../../shared/models/package-response.model";
import {FavoritesStore} from "../../favorites/services/favorites.store";
import {AuthStore} from "../../../core/services/auth.store";

export interface PackageParams {
  name: string | null;
  pageNumber: number;
  pageSize: number;
}

export interface PackagesState {
  data: PackageDataModel[];
  params: PackageParams;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: PackagesState = {
  data: [],
  params: {
    name: null,
    pageNumber: 1,
    pageSize: 5,
  },
  loading: false,
  loaded: false,
  error: null,
  total: 0,
}

@Injectable({
  providedIn: "root"
})
export class PackagesStore extends ComponentStore<PackagesState> {

  packages$ = this.select(s => s.data);

  vm$ = this.select(
    this.packages$,
    this.favoritesStore.favoritePackagesIds$,
    (packages, favoriteIds) => {
      return packages.map(p => ({
        ...p,
        isFavorite: this.authStore.state.user ? favoriteIds.includes(p.id) : undefined
      }))
    }
  );

  constructor(private packageService: PackagesService, private favoritesStore: FavoritesStore,
              private authStore: AuthStore
  ) {
    super(initialState);

    this.state$.subscribe(console.log)
  }

  // favoritesStore.favoritePackageIds$
  // markAsFavorite, removeFavorite,

  // favoritePackagesIds$ = of([1,23,4,5]);

  setInitialState = () => this.setState(initialState);

  get params() {
    return this.get(s => s.params);
  }

  load = this.effect((params$: Observable<Partial<PackageParams>>) => params$
    .pipe(tap(() => this.patchState({ loading: true, loaded: false, error: null })),
      switchMap(params => {
        const currentParams = this.params;
        const newParams = { ...currentParams, ...params };
        return this.packageService.getPackages(newParams).pipe(tap((response: PackageResponseModel) =>
            this.patchState(
              {
                data: response.data,
                loading: false,
                loaded: true,
                params: newParams,
                total: response.pagination.totalCount
              })
          ), catchError(error => {
              this.patchState({
                data: [],
                loading: false,
                loaded: false,
                params: initialState.params,
                error: error.message,
              });
              return EMPTY;
            }
          )
        );
      })
    ));

}
