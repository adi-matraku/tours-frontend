import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-buttons-spinner',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="spinner"></div>`,
  styleUrls: ['./buttons-spinner.component.scss']
})
export class ButtonsSpinnerComponent {

}
