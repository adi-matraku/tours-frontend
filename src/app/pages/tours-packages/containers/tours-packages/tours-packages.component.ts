import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ToursTableComponent} from "../../components/tours-table/tours-table.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {ToursStore} from "../../services/tours.store";
import {PagesPagination} from "../../../home/models/pages-pagination.model";
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {take} from "rxjs";
import {ToursDialogComponent} from "../../components/tours-dialog/tours-dialog.component";

@Component({
  selector: 'app-tours-packages',
  standalone: true,
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    ToursTableComponent,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    ToursDialogComponent
  ],
  templateUrl: './tours-packages.component.html',
  styleUrls: ['./tours-packages.component.scss'],
  providers: [ToursStore]
})
export class ToursPackagesComponent implements OnInit{

  search = new FormControl(null)

  constructor(public store: ToursStore, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.onLoadState();
  }

  onCreate() {
    const dialogRef = this.dialog.open(ToursDialogComponent, {
      disableClose: true,
      height: '25rem',
      width: '30rem'
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
    this.store.load({name: this.search.value});
  }

  onPaginate(event: PagesPagination) {
    this.store.load({ pageNumber: event.pageIndex + 1, pageSize: event.pageSize })
  }

  onLoadState() {
    this.store.load({})
  }

  onReset() {
    this.search.reset();
    this.store.load({name: this.search.value})
  }
}
