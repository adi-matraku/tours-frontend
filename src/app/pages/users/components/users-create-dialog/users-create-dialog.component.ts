import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../../services/users.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {take} from "rxjs";
import {UsersCreationModel} from "../../models/users-creation.model";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {UserModel} from "../../../../shared/models/user.model";

@Component({
  selector: 'app-users-create-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './users-create-dialog.component.html',
  styleUrls: ['./users-create-dialog.component.scss']
})
export class UsersCreateDialogComponent {

  hide = true;

  submitted: boolean = false;
  onLoading: boolean = false;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    role: ['', Validators.required],
    imageUrl: ['', Validators.required],
  })

  constructor(public dialogRef: MatDialogRef<UsersCreateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UserModel,
              private usersService: UsersService, private snackBar: MatSnackBar,
              private fb: FormBuilder
  ) {}

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.onLoading = true;
    const data = {
      ...this.form.getRawValue(),
      createdAt: new Date().toISOString(),
      lastActive: new Date().toISOString()
    }
    this.createUser(data);
  }

  createUser(data: UsersCreationModel) {
    this.usersService.postUser(data).pipe(take(1)).subscribe({
      next: res => {
        this.snackBar.open('Created successfully', 'Success', {duration: 1500})
        this.dialogRef.close(true);
      },
      error: err => {
        this.snackBar.open(err.error, 'Error', {duration: 1500})
        this.onLoading = false;
        console.log(err);
      }
    });
  }


}
