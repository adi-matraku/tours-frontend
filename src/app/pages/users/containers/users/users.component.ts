import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsersStore} from "../../services/users.store";
import {MatDialog} from "@angular/material/dialog";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormBuilder, ReactiveFormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {UsersTableComponent} from "../../components/users-table/users-table.component";
import {MatSelectModule} from "@angular/material/select";
import {take} from "rxjs";
import {UsersCreateDialogComponent} from "../../components/users-create-dialog/users-create-dialog.component";
import {PagesPagination} from "../../../../shared/models/pages-pagination.model";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [
    CommonModule,
    UsersTableComponent,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSelectModule
  ],
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  providers: [UsersStore]
})
export class UsersComponent implements OnInit {

  form = this.fb.group({
    name: null,
    role: null
  })

  constructor(public store: UsersStore, private dialog: MatDialog, private fb: FormBuilder) { }

  ngOnInit() {
    this.onLoadState();
  }

  onCreate() {
    const dialogRef = this.dialog.open(UsersCreateDialogComponent, {
      disableClose: true,
    })

    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: res => {
        if(res) {
          this.onLoadState();
        }
      }
    })
  }

  onSearch() {
    this.store.load({name: this.form.value.name, role: this.form.value.role});
  }

  onPaginate(event: PagesPagination) {
    this.store.load({ pageNumber: event.pageIndex + 1, pageSize: event.pageSize })
  }

  onReset() {
    this.form.reset();
    this.store.load({name: null, role: null});
  }

  onLoadState() {
    this.store.load({})
  }
}
