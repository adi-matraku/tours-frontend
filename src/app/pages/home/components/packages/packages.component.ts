import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PackageParams} from "../../services/packages.store";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {PackageDataModel} from "../../../../shared/models/package-data.model";
import {PagesFilteringModel} from "../../models/pages-filtering.model";
import {AuthStore} from "../../../../core/services/auth.store";
import {PagesPagination} from "../../../../shared/models/pages-pagination.model";
import {ActivatedRoute} from "@angular/router";
import {take} from "rxjs";
import {FavoritesStore} from "../../../favorites/services/favorites.store";

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatPaginatorModule,
    ReactiveFormsModule
  ],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PackagesComponent implements OnInit{

  search = new FormControl(null)

  @Input() data!: PackageDataModel[];
  @Input() loading!: boolean;
  @Input() loaded!: boolean;
  @Input() total!: number;
  @Input() error!: string | null;
  @Input() params!: PackageParams;
  @Input() pageSize!: number;
  @Input() pageNumber!: number;

  @Output() paginationChanged = new EventEmitter<PagesFilteringModel>();
  @Output() filterChanged = new EventEmitter<string | null>();

  constructor(public authStore: AuthStore, private route: ActivatedRoute,
              private favoritesStore: FavoritesStore) {
  }

  ngOnInit() {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
      if(params['name']) this.search.setValue(params['name'])
    });
  }

  toggleFavorite(card: PackageDataModel) {
    card.isFavorite ? this.favoritesStore.removeFavorite(card.id) :
      this.favoritesStore.setFavorite(card.id)
  }

  onPageChange(event: PagesPagination) {
    this.paginationChanged.emit({pagination: event, name: this.search.getRawValue()})
  }
}
