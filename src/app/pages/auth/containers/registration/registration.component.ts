import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {AuthStore} from "../../../../core/services/auth.store";
import {UserRegistrationModel} from "../../models/user-registration.model";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export default class RegistrationComponent {
  hide = true;
  submitted: boolean = false;

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    imageUrl: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder, public authStore: AuthStore) {
  }

  onRegister() {
    this.submitted = true;
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      const userData: UserRegistrationModel = {
        ...this.form.getRawValue(),
        createdAt: new Date().toISOString()
      }
      this.authStore.register(userData)
    }
  }

  resetState() {
    this.authStore.setInitialState();
  }
}
