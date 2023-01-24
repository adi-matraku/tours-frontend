import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PackageDataModel} from "../../../home/services/packages.store";
import {PagesPagination} from "../../../home/models/pages-pagination.model";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-tours-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatPaginatorModule, MatProgressSpinnerModule, MatButtonModule],
  templateUrl: './tours-table.component.html',
  styleUrls: ['./tours-table.component.scss']
})
export class ToursTableComponent {

  displayedColumns: string[] = ['id', 'name', 'user', 'action'];
  @Input() dataSource!: PackageDataModel[];
  @Input() total!: number;
  @Input() loading!: boolean;
  @Input() loaded!: boolean;
  @Input() error!: string | null;

  onPageChange(event: PagesPagination) {
    console.log(event);
  }

}
