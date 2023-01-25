import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PagesPagination} from "../../../home/models/pages-pagination.model";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {take} from "rxjs";
import {ToursDialogComponent} from "../tours-dialog/tours-dialog.component";
import {ToursDeleteDialogComponent} from "../tours-delete-dialog/tours-delete-dialog.component";
import {PackageDataModel} from "../../../../shared/models/package-data.model";

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

  onDelete(data: string) {
    const dialogRef = this.dialog.open(ToursDeleteDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: data,
    })

    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: res => {
        console.log(res);
        if(res) {
          this.loadState.emit();
        }
      }
    })
  }

}
