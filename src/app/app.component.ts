import {Component, OnInit} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AuthStore} from "./core/services/auth.store";
import {PackagesStore} from "./pages/home/services/packages.store";
import {FavoritesStore} from "./pages/favorites/services/favorites.store";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
  title = 'tours-project-frontend';

  constructor(public authStore: AuthStore) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    // const favorites = localStorage.getItem('favorites');

    if (token && user) {
      this.authStore.patchState({
        user: JSON.parse(user),
        token: token,
        authenticating: false,
        authenticated: true
      });
      // this.authStore.setToken(token);
      // this.authStore.setUser(JSON.parse(user));
      // this.profileService.getProfile().pipe(take(1)).subscribe({
      //     next: (me: UserModel) => {
      //       // this.authStore.setNewState({
      //       //   user: me,
      //       //   authenticated: true,
      //       //   authenticating: false,
      //       // });
      //       this.authStore.setNewState({
      //         user: JSON.parse(user),
      //         token: token,
      //         authenticating: false,
      //         authenticated: true
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
      localStorage.clear();
    }
  }
}
