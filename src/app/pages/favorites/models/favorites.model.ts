import {UserModel} from "../../../shared/models/user.model";
import {FavoritePackageModel} from "./favorite-package.model";

export interface FavoritesModel {
  id: number;
  packageId: number;
  package: FavoritePackageModel;
  userId: number;
  user: UserModel | null;
}
