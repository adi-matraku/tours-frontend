import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthStore} from "../../../core/services/auth.store";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import {UserCredentials} from "../models/user-credentials.model";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: UserCredentials): Observable<any> {
    return this.http.post(`${environment.apiUrl}/Auth/login`, credentials)
  }

  // logout(): Observable<any>  {
    // return this.http.post(`${environment.apiUrl}/Auth/logout`)
    // this.authStore.setState({ user: null, authenticated: false, authenticating: false, error: null });
    // localStorage.clear();
    // this.router.navigate(['/auth']);
  // }
}
