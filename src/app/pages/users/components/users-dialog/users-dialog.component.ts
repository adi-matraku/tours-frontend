import {Component, Inject} from '@angular/core';
import { CommonModule } from '@angular/common';
import {TourCreationModel} from "../../../tours-packages/models/tour-creation.model";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {UsersModel} from "../../models/users.model";
import {UsersService} from "../../services/users.service";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-users-dialog',
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
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent {
  hide = true;

  submitted: boolean = false;
  onLoading: boolean = false;

  form = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    role: ['', Validators.required],
    imageUrl: ['', Validators.required],
  })

  constructor(public dialogRef: MatDialogRef<UsersDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: UsersModel,
              private usersService: UsersService,
              private fb: FormBuilder
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  onSubmit() {
    this.submitted = true;

    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    // this.onLoading = true;
    // if(this.data) {
    //   const data = {
    //     id: this.data.id,
    //     name: this.name.getRawValue(),
    //   }
    //   this.updateTour(data);
    // } else {
    //   const data: TourCreationModel = {
    //     name: this.name.getRawValue(),
    //     userId: this.authStore.state.user?.id!
    //   }
    //   this.createTour(data);
    // }
  }

}
