import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileFormComponent} from "../../components/profile-form/profile-form.component";
import {catchError, concatMap, Observable, of, take, tap} from "rxjs";
import {AuthStore, UserModel} from "../../../../core/services/auth.store";
import {ProfileService} from "../../services/profile.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {UserUpdateModel} from "../../models/user-update.model";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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
export class ProfileComponent {

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
          this.authStore.setNewState({user: res});
          localStorage.setItem('user', JSON.stringify(res));
          this.snackBar.open('Edited successfully', 'Success', {duration: 1500})
          this.router.navigateByUrl('/home').then();
        }),
          catchError((err => {
            this.snackBar.open(err.error, 'Error')
            return of(null);
          }))
        )
      }),
      catchError((err => {
        this.snackBar.open(err.error, 'Error', {duration: 1500})
        return of(null);
      }))
    ).subscribe((res)=> console.log(res))
    // this.profileService.updateProfile(data).pipe(take(1)).subscribe({
    //   next: res => {
    //     this.profileService.getProfile().pipe(take(1)).subscribe({
    //       next: user => {
    //         this.loadingButton = false;
    //         this.authStore.setNewState({user: user});
    //         this.openSnackBar('Edited Successfully');
    //         this.router.navigateByUrl('/home').then();
    //       },
    //       error: err => {
    //         console.log(err);
    //         this.loadingButton = false;
    //         this.openSnackBar(err.error);
    //       }
    //     });
    //   },
    //   error: err => {
    //     console.log(err);
    //     this.loadingButton = false;
    //     this.openSnackBar(err.error);
    //   }
    // })
  }
}
