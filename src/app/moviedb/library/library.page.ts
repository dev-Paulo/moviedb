import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { FavoritesService } from './favorites.service';
import { Favorite } from './favorite.model';

@Component({
  selector: 'app-library',
  templateUrl: './library.page.html',
  styleUrls: ['./library.page.scss'],
})
export class LibraryPage implements OnInit, OnDestroy {

  loadedFavorites: Favorite[];
  isLoading = false;
  private favoriteSub: Subscription;

  constructor(
    private favoritesService: FavoritesService,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.favoriteSub = this.favoritesService.favorites.subscribe(favorites => {
      this.loadedFavorites = favorites;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.favoritesService.fetchFavorites().subscribe(() => {
      this.isLoading = false;
      console.log(this.loadedFavorites);
    });
  }

  onDeleteFavorite(favoriteId: string) {
    this.loadingCtrl.create({
      message: 'Removing this favorite from your list'
    }).then(loadingEl => {
      loadingEl.present();
      this.favoritesService.deleteFavorite(favoriteId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if (this.favoriteSub) {
      this.favoriteSub.unsubscribe();
    }
  }

}
