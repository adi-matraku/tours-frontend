import {UserModel} from "../../core/services/auth.store";

export interface PackageDataModel {
  id: number;
  name: string;
  user: UserModel;
}
