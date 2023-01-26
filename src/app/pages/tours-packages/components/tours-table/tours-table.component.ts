import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {take} from "rxjs";
import {ToursDialogComponent} from "../tours-dialog/tours-dialog.component";
import {PackageDataModel} from "../../../../shared/models/package-data.model";
import {PagesPagination} from "../../../../shared/models/pages-pagination.model";
import {ConfirmDeleteDirective} from "../../../../shared/directives/confirm-delete.directive";

@Component({
  selector: 'app-tours-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule,
    ConfirmDeleteDirective
  ],
  templateUrl: './tours-table.component.html',
  styleUrls: ['./tours-table.component.scss']
})
export class ToursTableComponent {

  constructor(private dialog: MatDialog) {}

  displayedColumns: string[] = ['id', 'name', 'user', 'action'];
  @Input() dataSource!: PackageDataModel[];
  @Input() total!: number;
  @Input() pageSize!: number;
  @Input() pageNumber!: number;
  @Input() loading!: boolean;
  @Input() loaded!: boolean;
  @Input() error!: string | null;
  @Output() paginated = new EventEmitter<PagesPagination>();
  @Output() loadState = new EventEmitter();

  onEdit(data: PackageDataModel) {
    const dialogRef = this.dialog.open(ToursDialogComponent, {
      disableClose: true,
      data: data,
    })

    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: res => {
        if(res) {
          this.loadState.emit();
        }
      }
    })
  }

}
