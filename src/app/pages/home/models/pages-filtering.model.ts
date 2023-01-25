import {PagesPagination} from "../../../shared/models/pages-pagination.model";

export interface PagesFilteringModel {
  pagination: PagesPagination;
  name: string | null;
}
