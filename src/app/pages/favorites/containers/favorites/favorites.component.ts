import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FavoritesStore} from "../../services/favorites.store";
import {FavoritesCardsComponent} from "../../components/favorites-cards/favorites-cards.component";
import {PagesPagination} from "../../../../shared/models/pages-pagination.model";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule, FavoritesCardsComponent, MatProgressSpinnerModule],
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export default class FavoritesComponent implements OnInit {

  constructor(public favoritesStore: FavoritesStore) {
  }

  ngOnInit() {
    this.favoritesStore.loadFavorites();
  }

}
