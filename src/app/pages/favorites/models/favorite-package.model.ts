import {UserModel} from "../../../shared/models/user.model";

export interface FavoritePackageModel {
  id: number;
  name: string;
  userId: number;
  user: UserModel | null;
}
