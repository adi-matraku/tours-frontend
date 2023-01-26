import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule],
  template: `
    <div class="page-container">
      <div class="form-container flex">
        <button routerLink="home" mat-fab color="primary" class="button-home">
          <mat-icon>home</mat-icon>
        </button>
        <div class="page-content">
          <router-outlet></router-outlet>
        </div>
      </div>
      <div class="image-container"></div>
    </div>
  `,
  styleUrls: ['./auth-layout.component.scss']
})
export default class AuthLayoutComponent {
}
