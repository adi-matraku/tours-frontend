import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PackagesStore} from "../../services/packages.store";
import {PackagesComponent} from "../../components/packages/packages.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, PackagesComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [PackagesStore]
})
export class HomeComponent implements OnInit {

  constructor(public store: PackagesStore) { }

  ngOnInit(): void {
    this.store.load({});
  }

}
