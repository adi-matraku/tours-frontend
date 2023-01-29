import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileFormComponent} from "../../components/profile-form/profile-form.component";
import {catchError, concatMap, Observable, of, take, tap} from "rxjs";
import {AuthStore} from "../../../../core/services/auth.store";
import {ProfileService} from "../../services/profile.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {UserModel} from "../../../../shared/models/user.model";
import {UserUpdateModel} from "../../../../shared/models/user-update.model";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ProfileFormComponent,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export default class ProfileComponent {

  loadingButton: boolean = false;

  userProfile$: Observable<UserModel> =  this.profileService.getProfile();

  constructor(private authStore: AuthStore,
              private profileService: ProfileService,
              private snackBar: MatSnackBar,
              private router: Router
  ) {
  }

  onEdit(data: UserUpdateModel) {
    this.loadingButton = true;
    this.profileService.updateProfile(data).pipe(
      take(1),
      concatMap(() => {
        return this.profileService.getProfile().pipe(take(1),
        tap((res) => {
          this.loadingButton = false;
          this.authStore.patchState({user: res});
          localStorage.setItem('user', JSON.stringify(res));
          this.snackBar.open('Edited successfully', 'Success', {duration: 1500})
          this.router.navigateByUrl('/home').then();
        }),
          catchError((err => {
            this.snackBar.open(err.error, 'Error', {duration: 1500})
            return of(null);
          }))
        )
      }),
      catchError((err => {
        this.snackBar.open(err.error, 'Error', {duration: 1500})
        return of(null);
      }))
    ).subscribe((res)=> console.log(res))
  }
}
