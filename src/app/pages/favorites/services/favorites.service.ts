import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../../../core/services/auth.store";
import {environment} from "../../../../environments/environment";

export class FavoritesService {
  constructor(private http: HttpClient) {
  }

  getFavorites(): Observable<UserModel> {
    return this.http.get<UserModel>(`${environment.apiUrl}/Favorite`)
  }

}
