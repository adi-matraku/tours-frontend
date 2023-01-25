import {Component, Inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {MAT_DIALOG_DATA, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormControl, ReactiveFormsModule, Validators} from "@angular/forms";
import {take} from "rxjs";
import {TourCreationModel} from "../../models/tour-creation.model";
import {TourUpdateModel} from "../../models/tour.update.model";
import {AuthStore} from "../../../../core/services/auth.store";
import {PackageDataModel} from "../../../../shared/models/package-data.model";
import {ToursService} from "../../services/tours.service";
import {MatIconModule} from "@angular/material/icon";
import {MatSnackBar, MatSnackBarModule} from "@angular/material/snack-bar";

@Component({
  selector: 'app-tours-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatIconModule,
    MatSnackBarModule
  ],
  templateUrl: './tours-dialog.component.html',
  styleUrls: ['./tours-dialog.component.scss']
})
export class ToursDialogComponent implements OnInit {

  submitted: boolean = false;
  onLoading: boolean = false;
  name = new FormControl('', {nonNullable: true, validators: [Validators.required, Validators.minLength(3)]})

  constructor(public dialogRef: MatDialogRef<ToursDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: PackageDataModel,
              private snackBar: MatSnackBar,
              private authStore: AuthStore, private toursService: ToursService) {}

  ngOnInit() {
    if(this.data) {
      this.name.setValue(this.data.name)
    }
  }

  onSubmit() {
    this.submitted = true;

    if(this.name.invalid) {
      this.name.markAsTouched();
      return;
    }
    this.onLoading = true;
    if(this.data) {
      const data = {
        id: this.data.id,
        name: this.name.getRawValue(),
      }
      this.updateTour(data);
    } else {
      const data: TourCreationModel = {
        name: this.name.getRawValue(),
        userId: this.authStore.state.user?.id!
      }
      this.createTour(data);
    }
  }

  createTour(data: TourCreationModel) {
    this.toursService.postTour(data).pipe(take(1)).subscribe({
      next: res => {
        this.snackBar.open('Created successfully', 'Success', {duration: 1500})
        this.dialogRef.close(true);
      },
      error: err => {
        this.snackBar.open(err.error, 'Error')
        this.onLoading = false;
        console.log(err);
      }
    });
  }

  updateTour(data: TourUpdateModel) {
    this.toursService.editTour(data).pipe(take(1)).subscribe({
      next: res => {
        this.snackBar.open('Edited successfully', 'Success', {duration: 1500})
        this.dialogRef.close(true);
      },
      error: err => {
        this.snackBar.open(err.error, 'Error')
        this.onLoading = false;
        console.log(err);
      }
    });
  }

  onClose() {
    this.dialogRef.close();
  }

}
