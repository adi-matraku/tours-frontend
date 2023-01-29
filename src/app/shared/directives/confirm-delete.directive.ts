import {Component, Directive, EventEmitter, HostListener, Inject, Input, Output} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {take} from "rxjs";
import {MatButtonModule} from "@angular/material/button";
import {ToursService} from "../../pages/tours-packages/services/tours.service";

@Component({
  template: `
    <h1 mat-dialog-title>Delete</h1>
    <div mat-dialog-content>
      Would you like to delete this {{ element.type }}?
    </div>
    <div mat-dialog-actions class="ml-1 mb-1">
      <button mat-button type="button" [mat-dialog-close]="false" [disabled]="isOnLoading">Cancel</button>
      <button mat-raised-button color="warn" type="button" [disabled]="isOnLoading" (click)="confirm()">
        Delete
      </button>
    </div>
  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule]
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public element: any,
              private toursService: ToursService
              ) {}

  isOnLoading: boolean = false;

  confirm() {
    this.isOnLoading = true;
    console.log(this.element);
    if(this.element.type === 'tour') {
      console.log(this.element.data.id);
      this.toursService.deleteTour(this.element.data.id).pipe(take(1)).subscribe({
        next: res => {
          this.isOnLoading = false;
          this.dialogRef.close(true);
        },
        error: err => {
          this.isOnLoading = false;
          console.log(err);
        }
      })
    }
  }
}

@Directive({
  selector: '[confirmDelete]',
  standalone: true
})
export class ConfirmDeleteDirective {

  @Input() data: any;
  @Output() confirmDelete = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) {}

  @HostListener('click')
  onDelete() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: this.data,
    })

    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: (res: boolean) => {
        console.log(res);
        this.confirmDelete.emit(res);
      }
    })
  }
}
