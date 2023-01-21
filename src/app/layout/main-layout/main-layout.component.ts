import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from "@angular/router";
import {AuthStore} from "../../core/services/auth.store";
import {AuthService} from "../../pages/auth/services/auth.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [CommonModule, RouterModule, MatButtonModule, MatMenuModule],
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(public authStore: AuthStore, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authStore.setInitialState();
    this.authService.logout();
  }

}
