import {Component, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AuthStore, UserModel} from "./core/services/auth.store";
import {AuthService} from "./pages/auth/services/auth.service";
import {take} from "rxjs";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  title = 'tours-project-frontend';

  constructor(public authStore: AuthStore, private authService: AuthService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.authStore.setToken(token);
      this.authService
        .getProfile()
        .pipe(take(1))
        .subscribe({
          next: (me: UserModel) => {
            this.authStore.patchState({
              user: me,
              authenticated: true,
              authenticating: false,
            });
          },
          error: (err) => {
            this.authStore.patchState({user: null});
            localStorage.removeItem('token');
          },
        });
    }
  }
}
