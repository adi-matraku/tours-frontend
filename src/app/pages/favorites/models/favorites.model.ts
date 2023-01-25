import {UserModel} from "../../../shared/models/user.model";
import {FavoritePackageModel} from "./favorite-package.model";

export interface FavoritesModel {
  id: number;
  package: FavoritePackageModel;
  packageId: number;
  user: UserModel | null;
  userId: number;
}
