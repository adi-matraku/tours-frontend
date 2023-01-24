import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class FavoritesService {
  constructor(private http: HttpClient) {
  }

  getFavorites(): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/Favorite`)
  }

}
