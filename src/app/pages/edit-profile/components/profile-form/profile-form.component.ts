import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {UserModel} from "../../../../core/services/auth.store";
import {MatButtonModule} from "@angular/material/button";
import {ProfileService} from "../../services/profile.service";
import {take} from "rxjs";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {UserUpdateModel} from "../../models/user-update.model";

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent {
  submitted: boolean = false;
  loading: boolean = false;
  userDetails!: UserModel;

  @Output() submittedForm = new EventEmitter<UserUpdateModel>();

  @Input() set formValue(data: UserModel) {
    this.userDetails = data;
    this.form.patchValue({
      name: data.name!,
      email: data.email!,
      imageUrl: data.imageUrl!,
    })
  }

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    imageUrl: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private profileService: ProfileService) {
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      const data = {
        id: this.userDetails.id!,
        ...this.form.getRawValue()
      }
      this.submittedForm.emit(data);
    }
  }
}
