import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProfileFormComponent} from "../../components/profile-form/profile-form.component";
import {Observable, take} from "rxjs";
import {AuthStore, UserModel} from "../../../../core/services/auth.store";
import {ProfileService} from "../../services/profile.service";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {UserUpdateModel} from "../../models/user-update.model";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, ProfileFormComponent, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  userProfile$: Observable<UserModel | null> =  this.profileService.getProfile();

  constructor(private authStore: AuthStore,
              private profileService: ProfileService,
              private snackBar: MatSnackBar,
              private router: Router
  ) {
  }

  onEdit(data: UserUpdateModel) {
    this.profileService.updateProfile(data).pipe(take(1)).subscribe({
      next: res => {
        this.profileService.getProfile().pipe(take(1)).subscribe((user) => {
          this.authStore.patchState({
            user: user,
          });
          this.openSnackBar('Edited Successfully');
          this.router.navigateByUrl('/home').then();
        });
      },
      error: err => {
        console.log(err);
        this.openSnackBar(err.error);
      }
    })
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, '', {
      duration: 1500,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }

}
