import {ComponentStore} from "@ngrx/component-store";
import {UsersService} from "./users.service";
import {Injectable} from "@angular/core";
import {catchError, EMPTY, Observable, switchMap, tap} from "rxjs";
import {UsersModel} from "../models/users.model";
import {Pagination} from "../../../shared/models/pagination.model";

export interface UsersResponseModel {
  data: UsersModel[];
  pagination: Pagination;
}

export interface UsersParams {
  name: string | null;
  role: number | null;
  pageNumber: number;
  pageSize: number;
}

export interface UsersState {
  data: UsersModel[];
  params: UsersParams;
  loading: boolean;
  loaded: boolean;
  error: string | null;
  total: number;
}

export const initialState: UsersState = {
  data: [],
  params: {
    name: null,
    role: null,
    pageNumber: 1,
    pageSize: 10,
  },
  loading: false,
  loaded: false,
  error: null,
  total: 0,
}

@Injectable()
export class UsersStore extends ComponentStore<UsersState> {
  constructor(private usersService: UsersService) {
    super(initialState);
  }

  get state() {
    return this.get(s => s);
  }

  load = this.effect((params$: Observable<Partial<UsersParams>>) => params$
    .pipe(tap(() => this.patchState({ loading: true, loaded: false, error: null })),
      switchMap(params => {
        const currentParams = this.state.params;
        const newParams = { ...currentParams, ...params };
        return this.usersService.getUsers(newParams).pipe(tap((response: UsersResponseModel) =>
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
