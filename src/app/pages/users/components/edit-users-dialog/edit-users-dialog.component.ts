import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {UsersModel} from "../../models/users.model";
import {UsersService} from "../../services/users.service";
import {UserUpdateModel} from "../../../edit-profile/models/user-update.model";
import {take} from "rxjs";

@Component({
  selector: 'app-edit-users-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './edit-users-dialog.component.html',
  styleUrls: ['./edit-users-dialog.component.scss']
})
export class EditUsersDialogComponent implements OnInit {

  submitted: boolean = false;
  onLoading: boolean = false;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    imageUrl: ['', Validators.required],
  })

  constructor(public dialogRef: MatDialogRef<EditUsersDialogComponent>, private fb: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: UsersModel, private usersService: UsersService) {
  }

  ngOnInit() {
    if(this.data) {
      this.form.patchValue({
        name: this.data.name,
        email: this.data.email,
        imageUrl: this.data.imageUrl
      })
    }
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data: UserUpdateModel = {
      id: this.data.id,
      ...this.form.getRawValue()
    }

    this.onLoading = true;
    this.usersService.editUser(data).pipe(take(1)).subscribe({
      next: res => {
        this.dialogRef.close(true);
      },
      error: err => {
        this.onLoading = false;
        console.log(err);
      }
    })
  }

}
