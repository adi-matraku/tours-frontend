import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {UserCredentials} from "../models/user-credentials.model";
import {UserModel} from "../../../core/services/auth.store";
import {UserRegistrationModel} from "../models/user-registration.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credentials: UserCredentials): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/Auth/login`, credentials)
  }

  register(data: UserRegistrationModel): Observable<UserModel> {
    return this.http.post<UserModel>(`${environment.apiUrl}/Auth/register`, data)
  }

  // logout() {
    // return this.http.post(`${environment.apiUrl}/Auth/logout`)
    // this.authStore.setState({ user: null, authenticated: false, authenticating: false, error: null });
    // localStorage.clear();
    // this.router.navigate(['/auth']);
  // }
}
