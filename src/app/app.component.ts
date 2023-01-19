import { Component } from '@angular/core';
import {RouterModule} from "@angular/router";

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`
})
export class AppComponent {
  title = 'tours-project-frontend';
}
