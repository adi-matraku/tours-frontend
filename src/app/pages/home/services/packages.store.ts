import {ComponentStore} from "@ngrx/component-store";
import {Injectable} from "@angular/core";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {PackagesService} from "./packages.service";
import {PackageDataModel} from "../../../shared/models/package-data.model";
import {PackageResponseModel} from "../../../shared/models/package-response.model";

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

@Injectable()
export class PackagesStore extends ComponentStore<PackagesState> {
  constructor(private packageService: PackagesService) {
    super(initialState);

    this.state$.subscribe(console.log)
  }

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
