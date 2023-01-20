import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {RouterModule} from "@angular/router";
import {AuthStore, UserModel} from "../../../../core/services/auth.store";
import {UserCredentials} from "../../models/user-credentials.model";

@Component({
  selector: 'app-authentication',
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
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.scss'],
  providers: [AuthStore]
})
export class AuthenticationComponent implements OnInit {
  hide = true;
  error!: string;
  isLogin: boolean = true;
  submitted: boolean = false;

  form = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.minLength(6), Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private fb: FormBuilder, public authStore: AuthStore) { }

  ngOnInit(): void {
  }

  onLogin() {
    this.submitted = true;
    if(this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    } else {
      const data = this.form.value;
      this.isLogin ?
        this.authStore.login(this.form.getRawValue()) :
        console.log('here')
    }

  }

}
