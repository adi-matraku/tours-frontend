import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {PagesPagination} from "../../../home/models/pages-pagination.model";
import {MatTableModule} from "@angular/material/table";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatButtonModule} from "@angular/material/button";
import {UsersModel} from "../../models/users.model";

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
  }

  onDelete(user: string) {
    console.log(user);
  }
}
