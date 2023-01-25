import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PackageParams} from "../../services/packages.store";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatCardModule} from "@angular/material/card";
import {PagesPagination} from "../../models/pages-pagination.model";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {PackageDataModel} from "../../../../shared/models/package-data.model";
import {PagesFilteringModel} from "../../models/pages-filtering.model";

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
export class PackagesComponent {

  search = new FormControl(null)

  @Input() data!: PackageDataModel[];
  @Input() loading!: boolean;
  @Input() loaded!: boolean;
  @Input() total!: number;
  @Input() error!: string | null;
  @Input() params!: PackageParams;

  @Output() paginationChanged = new EventEmitter<PagesFilteringModel>();
  @Output() filterChanged = new EventEmitter<string | null>();

  addToFavorite(card: PackageDataModel) {
    console.log(card);
  }

  onPageChange(event: PagesPagination) {
    this.paginationChanged.emit({pagination: event, name: this.search.getRawValue()})
  }
}
