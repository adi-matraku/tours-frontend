import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {take} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {UsersService} from "../../services/users.service";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-users-delete-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSnackBarModule
  ],
  templateUrl: './users-delete-dialog.component.html',
  styleUrls: ['./users-delete-dialog.component.scss']
})
export class UsersDeleteDialogComponent {

  onLoading: boolean = false;

  constructor(public dialogRef: MatDialogRef<UsersDeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: string,
              private usersService: UsersService, private snackBar: MatSnackBar
  ) {}

  onDelete() {
    this.onLoading = true;
    this.usersService.deleteUser(this.data).pipe(take(1)).subscribe({
      next: res => {
        this.snackBar.open('Deleted successfully', 'Success', {duration: 1500})
        this.dialogRef.close(true);
      },
      error: err => {
        this.snackBar.open(err.error, 'Error', {duration: 1500})
        this.onLoading = false;
        console.log(err);
      }
    })
  }
}
