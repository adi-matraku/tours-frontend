import {UserModel} from "./user.model";

export interface PackageDataModel {
  id: number;
  name: string;
  user: UserModel;
}
