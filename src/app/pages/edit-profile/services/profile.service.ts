import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {UserModel} from "../../../shared/models/user.model";
import {UserUpdateModel} from "../../../shared/models/user-update.model";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getProfile(): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.apiUrl}/Profile`)
  }

  updateProfile(data: UserUpdateModel): Observable<UserModel> {
    return this.http.put<UserModel>(`${environment.apiUrl}/Profile`, data)
  }
}
