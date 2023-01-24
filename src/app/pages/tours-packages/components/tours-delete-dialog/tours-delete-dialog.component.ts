import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ToursService} from "../../services/tours.service";
import {take} from "rxjs";

@Component({
  selector: 'app-tours-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  templateUrl: './tours-delete-dialog.component.html',
  styleUrls: ['./tours-delete-dialog.component.scss']
})
export class ToursDeleteDialogComponent {

  onLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ToursDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private toursService: ToursService
  ) {}

  onDelete() {
    this.onLoading = true;
    this.toursService.deleteTour(this.data).pipe(take(1)).subscribe({
      next: res => {
        this.dialogRef.close(true);
      },
      error: err => {
        console.log(err);
        this.onLoading = false;
      }
    })
  }
}
