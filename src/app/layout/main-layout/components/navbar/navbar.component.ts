import {Component, EventEmitter, Input, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {MatButtonModule} from "@angular/material/button";
import {MatMenuModule} from "@angular/material/menu";
import {RoleDirective} from "../../../../shared/directives/role.directive";
import {AuthState, AuthStore} from "../../../../core/services/auth.store";
import {FavoritesState, FavoritesStore} from "../../../../pages/favorites/services/favorites.store";
import {AuthService} from "../../../../pages/auth/services/auth.service";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule,  MatButtonModule, MatMenuModule, RoleDirective],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() authState!: AuthState;
  @Input() favState!: FavoritesState;

  @Output() loggedOut = new EventEmitter();

  constructor(public favoritesStore: FavoritesStore) {}

}
