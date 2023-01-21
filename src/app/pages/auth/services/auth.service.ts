import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {UserCredentials} from "../models/user-credentials.model";
import {UserModel} from "../../../core/services/auth.store";
import {UserRegistrationModel} from "../models/user-registration.model";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: UserCredentials): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/Auth/login`, credentials)
  }

  register(data: UserRegistrationModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/Auth/register`, data)
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('auth/login').then();
  }
}
