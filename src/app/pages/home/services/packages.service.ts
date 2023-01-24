import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {PackageParams, PackageResponseModel} from "./packages.store";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  constructor(private http: HttpClient) {
  }

  getPackages(params: PackageParams): Observable<PackageResponseModel> {
    return this.http.get<PackageResponseModel>(`${environment.apiUrl}/Package`, {params: this.getPackageParams(params)})
  }

  getPackageParams(params: PackageParams) {

    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageNumber', params.pageNumber)
    httpParams = httpParams.set('pageSize', params.pageSize)

    if (params.name) {
      httpParams = httpParams.set('name', params.name)
    }

    return httpParams;
  }

}
