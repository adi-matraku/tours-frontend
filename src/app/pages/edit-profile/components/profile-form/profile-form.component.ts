import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {UserModel} from "../../../../shared/models/user.model";
import {UserUpdateModel} from "../../../../shared/models/user-update.model";

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './profile-form.component.html',
  styleUrls: ['./profile-form.component.scss']
})
export class ProfileFormComponent {
  submitted: boolean = false;
  userDetails!: UserModel;

  @Input() loading!: boolean;

  @Input() set formValue(data: UserModel) {
    this.userDetails = data;
    this.form.patchValue({
      name: data.name,
      email: data.email,
      imageUrl: data.imageUrl,
    })
  }

  @Output() submittedForm = new EventEmitter<UserUpdateModel>();

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    imageUrl: ['', Validators.required]
  })

  constructor(private fb: FormBuilder) {
  }

  onSubmit() {
    this.submitted = true;
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const data = {
      id: this.userDetails.id,
      ...this.form.getRawValue()
    }
    this.submittedForm.emit(data);
  }
}
