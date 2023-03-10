import {Injectable} from "@angular/core";
import {HttpClient, HttpParams} from "@angular/common/http";
import {PackageParams} from "../../home/services/packages.store";
import {environment} from "../../../../environments/environment";
import {TourCreationModel} from "../models/tour-creation.model";
import {PackageDataModel} from "../../../shared/models/package-data.model";
import {Observable} from "rxjs";
import {TourUpdateModel} from "../models/tour.update.model";
import {PackageResponseModel} from "../../../shared/models/package-response.model";

@Injectable({
  providedIn: "root"
})
export class ToursService {

  constructor(private http: HttpClient) {
  }

  getTours(params: PackageParams): Observable<PackageResponseModel> {
    return this.http.get<PackageResponseModel>(`${environment.apiUrl}/Package`, {params: this.getToursParams(params)})
  }

  getToursParams(params: PackageParams) {
    let httpParams = new HttpParams();
    httpParams = httpParams.set('pageNumber', params.pageNumber)
    httpParams = httpParams.set('pageSize', params.pageSize)

    if (params.name) {
      httpParams = httpParams.set('name', params.name)
    }

    return httpParams;
  }

  postTour(data: TourCreationModel): Observable<PackageDataModel> {
    return this.http.post<PackageDataModel>(`${environment.apiUrl}/Package`, data)
  }

  editTour(data: TourUpdateModel): Observable<any> {
    return this.http.put(`${environment.apiUrl}/Package/${data.id}`, data)
  }

  deleteTour(tour: string) {
    return this.http.delete(`${environment.apiUrl}/Package/${tour}`)
  }

}
