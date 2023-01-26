import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FavoritesModel} from "../../models/favorites.model";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatPaginatorModule} from "@angular/material/paginator";
import {PagesPagination} from "../../../../shared/models/pages-pagination.model";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-favorites-cards',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatPaginatorModule, MatProgressSpinnerModule],
  templateUrl: './favorites-cards.component.html',
  styleUrls: ['./favorites-cards.component.scss']
})
export class FavoritesCardsComponent {

  @Input() data!: FavoritesModel[];
  @Input() total!: number;
  @Input() pageSize!: number;
  @Input() pageNumber!: number;
  @Input() loading!: boolean;
  @Input() error!: string | null;
}
