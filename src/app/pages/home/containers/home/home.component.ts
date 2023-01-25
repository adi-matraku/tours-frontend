import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PackagesStore} from "../../services/packages.store";
import {PackagesComponent} from "../../components/packages/packages.component";
import {ActivatedRoute, Router} from "@angular/router";
import {take} from "rxjs";
import {isEmpty} from "../../utils/checkEmpty.function";
import {PagesFilteringModel} from "../../models/pages-filtering.model";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PackagesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PackagesStore]
})
export class HomeComponent implements OnInit {

  constructor(public store: PackagesStore, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe(params => {
        !isEmpty(params) ? this.store.load(params) :
          this.store.load({})
        });
  }

  paginate(event: PagesFilteringModel) {
    this.store.load({ pageNumber: event.pagination.pageIndex + 1, pageSize: event.pagination.pageSize, name: event.name })
    this.router.navigate(['/home'],
      { queryParams: { name: event.name, pageNumber: event.pagination.pageIndex + 1, pageSize: event.pagination.pageSize } }).then();
  }

  onFilter(event: string | null) {
    this.store.load({ name: event, pageNumber: 1, pageSize: 5 })
    this.router.navigate(['/home'], { queryParams: { name: event } }).then();
  }
}
