import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {AuthStore} from "../../core/services/auth.store";
import {AuthService} from "../../pages/auth/services/auth.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";
import {RoleDirective} from "../../shared/directives/role.directive";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatMenuModule, RoleDirective],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent {

  constructor(public authStore: AuthStore, private authService: AuthService) { }

  onLogout() {
    this.authStore.setInitialState();
    this.authService.logout();
  }

}
