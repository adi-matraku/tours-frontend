import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PackagesStore} from "../../services/packages.store";
import {PackagesComponent} from "../../components/packages/packages.component";
import {PagesPagination} from "../../models/pages-pagination.model";
import {ActivatedRoute, Router} from "@angular/router";

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
    this.store.load({});
    // this.router.navigate(
    //   ['/home'],
    //   { queryParams: { order: 'popular', 'price-range': 'not-cheap' } }
    // );
    this.route.queryParams
      .subscribe(params => {
          console.log(params); // { orderby: "price" }
          // this.orderby = params.orderby;
          // console.log(this.orderby); // price
        }
      );
  }

  paginate(event: PagesPagination) {
    console.log(event);
    this.store.load({ pageNumber: event.pageIndex + 1, pageSize: event.pageSize })
    this.router.navigate(
      ['/home'],
      { queryParams: { pageNumber: event.pageIndex + 1, pageSize: event.pageSize } }
    );
  }

  onFilter(event: string | null) {
    this.store.load({ name: event })
    this.router.navigate(
      ['/home'],
      { queryParams: { name: event } }
    );
  }

}
