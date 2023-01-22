import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {PackageParams} from "./packages.store";

@Injectable({
  providedIn: 'root'
})
export class PackagesService {
  constructor(private http: HttpClient) {
  }

  getPackages(params: PackageParams) {
    return this.http.get<any>(`${environment.apiUrl}/Package`, {params: this.getPackageParams(params)})
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
