import {Component, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AuthStore, UserModel} from "./core/services/auth.store";
import {take} from "rxjs";
import {ProfileService} from "./pages/edit-profile/services/profile.service";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent implements OnInit {
  title = 'tours-project-frontend';

  constructor(public authStore: AuthStore, private profileService: ProfileService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');

    if (token) {
      this.authStore.setToken(token);
      this.profileService.getProfile().pipe(take(1)).subscribe({
          next: (me: UserModel) => {
            this.authStore.setNewState({
              user: me,
              authenticated: true,
              authenticating: false,
            });
          },
          error: (err) => {
            console.log(err);
            this.authStore.setNewState({
              user: null,
              authenticated: false,
              authenticating: false,
              loginError: err.error
            });
            localStorage.removeItem('token');
          },
        });
    }
  }
}
