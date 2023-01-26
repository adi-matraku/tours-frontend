import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../../../environments/environment";
import {Injectable} from "@angular/core";
import {FavoritesModel} from "../models/favorites.model";

@Injectable({
  providedIn: "root"
})
export class FavoritesService {
  constructor(private http: HttpClient) {
  }

  getFavorites(): Observable<FavoritesModel[]> {
    return this.http.get<FavoritesModel[]>(`${environment.apiUrl}/Favorite`)
  }

  postFavorite(packageId: number): Observable<boolean> {
    return this.http.post<boolean>(`${environment.apiUrl}/Favorite/${packageId}`, {})
  }

  deleteFavorite(packageId: number): Observable<boolean> {
    return this.http.delete<boolean>(`${environment.apiUrl}/Favorite/${packageId}`)
  }

}
