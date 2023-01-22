import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PackageDataModel} from "../../services/packages.store";

@Component({
  selector: 'app-packages',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './packages.component.html',
  styleUrls: ['./packages.component.scss']
})
export class PackagesComponent {

  @Input() data!: PackageDataModel[];
  @Input() loading!: boolean;
  @Input() total!: number;

}
