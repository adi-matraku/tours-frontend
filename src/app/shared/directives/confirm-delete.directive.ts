import {Component, Directive, EventEmitter, HostListener, Inject, Input, Output} from "@angular/core";
import {MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import {take} from "rxjs";
import {MatButtonModule} from "@angular/material/button";


@Component({
  template: `
    <h1 mat-dialog-title>Delete</h1>
    <div mat-dialog-content>
      Would you like to delete this {{ type}}?
    </div>
    <div mat-dialog-actions class="ml-1 mb-1">
      <button mat-button type="button" [mat-dialog-close]="false">Cancel</button>
      <button mat-raised-button color="warn" type="click" (click)="confirm()">
        Delete
      </button>
    </div>

  `,
  standalone: true,
  imports: [MatButtonModule, MatDialogModule]
})
export class DeleteDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public type: string) {}

  confirm() {
    this.dialogRef.close(true)
  }
}

@Directive({
  selector: '[confirmDelete]',
  standalone: true
})
export class ConfirmDeleteDirective {

  @Input() type: string = '';
  @Output() confirmDelete = new EventEmitter<boolean>();

  constructor(private dialog: MatDialog) {}

  @HostListener('click')
  onDelete() {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      disableClose: true,
      autoFocus: false,
      data: this.type
    })

    dialogRef.afterClosed().pipe(take(1)).subscribe({
      next: (res: boolean) => {
        this.confirmDelete.emit(res);
      }
    })
  }
}
