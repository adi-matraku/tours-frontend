import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {UsersParams, UsersResponseModel} from "./users.store";
import {UsersCreationModel} from "../models/users-creation.model";
import {UsersModel} from "../models/users.model";
import {UserUpdateModel} from "../models/user-update.model";

@Injectable({
  providedIn: "root"
})
export class UsersService {

  constructor(private http: HttpClient) {
  }

  getUsers(params: UsersParams): Observable<UsersResponseModel> {
    return this.http.get<UsersResponseModel>(`${environment.apiUrl}/User`, {params: this.getUserParams(params)})
  }

  getUserParams(params: UsersParams) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageNumber', params.pageNumber)
    httpParams = httpParams.set('pageSize', params.pageSize)

    if (params.name) {
      httpParams = httpParams.set('name', params.name)
    }
    if (params.role) {
      httpParams = httpParams.set('role', params.role)
    }

    return httpParams;
  }

  postUser(data: UsersCreationModel): Observable<UsersModel> {
    return this.http.post<UsersModel>(`${environment.apiUrl}/User`, data)
  }

  editUser(data: UserUpdateModel): Observable<any> {
    return this.http.put<any>(`${environment.apiUrl}/User/${data.id}`, data)
  }

  deleteUser(id: string) {
    return this.http.delete(`${environment.apiUrl}/User/${id}`)
  }

}
