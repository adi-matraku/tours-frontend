import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ToursService} from "../../services/tours.service";
import {take} from "rxjs";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-tours-delete-dialog',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatDialogModule, MatFormFieldModule, MatInputModule, MatSnackBarModule],
  templateUrl: './tours-delete-dialog.component.html',
  styleUrls: ['./tours-delete-dialog.component.scss']
})
export class ToursDeleteDialogComponent {

  onLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<ToursDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private snackBar: MatSnackBar,
              private toursService: ToursService
  ) {}

  onDelete() {
    this.onLoading = true;
    this.toursService.deleteTour(this.data).pipe(take(1)).subscribe({
      next: res => {
        this.snackBar.open('Deleted successfully', 'Success', {duration: 1500})
        this.dialogRef.close(true);
      },
      error: err => {
        this.snackBar.open(err.error, 'Error', {duration: 1500})
        console.log(err);
        this.onLoading = false;
      }
    })
  }
}
