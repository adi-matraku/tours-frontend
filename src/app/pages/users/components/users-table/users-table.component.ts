import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {PagesPagination} from "../../../home/models/pages-pagination.model";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {UsersModel} from "../../models/users.model";
import {take} from "rxjs";
import {EditUsersDialogComponent} from "../edit-users-dialog/edit-users-dialog.component";
import {UsersDeleteDialogComponent} from "../users-delete-dialog/users-delete-dialog.component";

@Component({
  selector: 'app-users-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatDialogModule
  ],
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {

  constructor(private dialog: MatDialog) {}

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'image', 'action'];

  @Input() dataSource!: UsersModel[];
  @Input() total!: number;
  @Input() pageSize!: number;
  @Input() pageNumber!: number;
  @Input() loading!: boolean;
  @Input() loaded!: boolean;
  @Input() error!: string | null;
  @Output() paginated = new EventEmitter<PagesPagination>();
  @Output() loadState = new EventEmitter();

  onEdit(user: UsersModel) {
    console.log(user);
    const dialogRef = this.dialog.open(EditUsersDialogComponent, {
      disableClose: true,
      data: user
    })

    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: res => {
        if(res) {
          this.loadState.emit();
        }
      }
    })
  }

  onDelete(id: string) {
    const dialogRef = this.dialog.open(UsersDeleteDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: id
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
