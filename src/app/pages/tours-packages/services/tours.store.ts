import {ComponentStore} from "@ngrx/component-store";
import {Injectable} from "@angular/core";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {ToursService} from "./tours.service";
import {PackageDataModel} from "../../../shared/models/package-data.model";
import {PackageResponseModel} from "../../../shared/models/package-response.model";

export interface ToursParams {
  name: string | null;
  pageNumber: number;
  pageSize: number;
}

export interface ToursState {
  data: PackageDataModel[];
  params: ToursParams;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: ToursState = {
  data: [],
  params: {
    name: null,
    pageNumber: 1,
    pageSize: 10,
  },
  loading: false,
  loaded: false,
  error: null,
  total: 0,
}

@Injectable()
export class ToursStore extends ComponentStore<ToursState> {
  constructor(private toursService: ToursService) {
    super(initialState);

    this.state$.subscribe(console.log)
  }

  get params() {
    return this.get(s => s.params);
  }

  load = this.effect((params$: Observable<Partial<ToursParams>>) => params$
    .pipe(tap(() => this.patchState({ loading: true, loaded: false, error: null })),
      switchMap(params => {
        const currentParams = this.params;
        const newParams = { ...currentParams, ...params };
        return this.toursService.getTours(newParams).pipe(tap((response: PackageResponseModel) =>
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
