import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {take} from "rxjs";
import {EditUsersDialogComponent} from "../edit-users-dialog/edit-users-dialog.component";
import {UserModel} from "../../../../shared/models/user.model";
import {PagesPagination} from "../../../../shared/models/pages-pagination.model";
import {ConfirmDeleteDirective} from "../../../../shared/directives/confirm-delete.directive";

@Component({
  selector: 'app-users-table',
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
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss']
})
export class UsersTableComponent {

  constructor(private dialog: MatDialog) {}

  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'image', 'action'];

  @Input() dataSource!: UserModel[];
  @Input() total!: number;
  @Input() pageSize!: number;
  @Input() pageNumber!: number;
  @Input() loading!: boolean;
  @Input() loaded!: boolean;
  @Input() error!: string | null;
  @Output() paginated = new EventEmitter<PagesPagination>();
  @Output() loadState = new EventEmitter();

  onEdit(user: UserModel) {
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
}
