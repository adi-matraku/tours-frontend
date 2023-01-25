import {PackageDataModel} from "./package-data.model";
import {Pagination} from "./pagination.model";

export interface PackageResponseModel {
  data: PackageDataModel[];
  pagination: Pagination;
}
