import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PackagesStore} from "../../../home/services/packages.store";
import {ActivatedRoute, Router} from "@angular/router";
import {PackagesComponent} from "../../../home/components/packages/packages.component";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {ToursTableComponent} from "../../components/tours-table/tours-table.component";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-tours-packages',
  standalone: true,
  imports: [CommonModule, PackagesComponent, MatProgressSpinnerModule, ToursTableComponent, MatButtonModule, MatIconModule],
  templateUrl: './tours-packages.component.html',
  styleUrls: ['./tours-packages.component.scss'],
  providers: [PackagesStore]
})
export class ToursPackagesComponent implements OnInit{

  constructor(public store: PackagesStore, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.store.load({});
  }


}
