import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from 'src/app/movies.service';
import { ActivatedRoute } from '@angular/router';
import { NavController, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit, OnDestroy {
  imageUrl = 'http://image.tmdb.org/t/p/w300';
  isLoading = false;
  loadedMovie = [];
  public id: string;
  private movieSub: Subscription;

  constructor(
    private loadingCtrl: LoadingController,
    private moviesService: MoviesService,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    ) { }

  ngOnInit() {
    
     }

    ionViewWillEnter() {
      this.getMovieDetail();
    }

    getMovieDetail() {
      this.isLoading = true;
      this.route.paramMap.subscribe(paramMap => {
        if (!paramMap.has('movieId')) {
          this.navCtrl.navigateBack('/moviedb/tabs/discover');
          return;
        }
        return this.moviesService.getMovieDetail(paramMap.get('movieId')).subscribe(loadedMovie => {
          this.loadedMovie = loadedMovie;
          console.log(loadedMovie);
        });
      });
      this.loadingCtrl.create({keyboardClose: true,
        message: 'Getting more details for you...'
        }).then(loadingEl => {
          loadingEl.present();
          setTimeout(() => {
            this.isLoading = false;
            loadingEl.dismiss();
          });
        });
  }
    getMovieTrailer() {
      this.isLoading = true;
      this.route.paramMap.subscribe(paramMap => {
        if (!paramMap.has('movieId')) {
          this.navCtrl.navigateBack('/moviedb/tabs/discover');
          return;
        }
        return this.moviesService.getMovieTrailer(paramMap.get('movieId')).subscribe(loadedMovie => {
          this.loadedMovie = loadedMovie;
          console.log(loadedMovie);
        });
      });
      this.loadingCtrl.create({keyboardClose: true,
        message: 'Getting more details for you...'
        }).then(loadingEl => {
          loadingEl.present();
          setTimeout(() => {
            this.isLoading = false;
            loadingEl.dismiss();
          });
        });
  }
  ngOnDestroy() {
    if (this.movieSub) {
      this.movieSub.unsubscribe();
    }
  }
}


