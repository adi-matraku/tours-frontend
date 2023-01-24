import {Component, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AuthStore} from "./core/services/auth.store";
import {ProfileService} from "./pages/edit-profile/services/profile.service";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  title = 'tours-project-frontend';

  constructor(public authStore: AuthStore, private profileService: ProfileService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (token && user) {
      // this.authStore.setToken(token);
      // this.authStore.setUser(JSON.parse(user));
      this.authStore.setNewState({
        user: JSON.parse(user),
        token: token,
        authenticating: false,
        authenticated: true
      });
      // this.profileService.getProfile().pipe(take(1)).subscribe({
      //     next: (me: UserModel) => {
      //       this.authStore.setNewState({
      //         user: me,
      //         authenticated: true,
      //         authenticating: false,
      //       });
      //     },
      //     error: (err) => {
      //       console.log(err);
      //       this.authStore.setInitialState();
      //       localStorage.removeItem('token');
      //     },
      //   });
    } else {
      this.authStore.setInitialState();
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }
}
