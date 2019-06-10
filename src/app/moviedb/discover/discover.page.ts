import { Component, OnInit, OnDestroy } from '@angular/core';
import { MoviesService } from '../../movies.service';
import { LoadingController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Movie } from 'src/app/models/movie';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit, OnDestroy {


  public isLoading = false;
  public id = '';
  public query = '';
  public movies = [];
  public filteredMovies = [...this.movies];
  imageUrl = 'http://image.tmdb.org/t/p/w500';
  private movieSub: Subscription;


  constructor(
    public router: Router,
    public moviesService: MoviesService,
    private loadingController: LoadingController,
    private menu: MenuController) { }

  ngOnInit() {
    this.getMovies();
      }

  async getAllMovies() {
    this.isLoading = true;
    this.moviesService.getAllMovies(this.query).subscribe(all => {
      this.movies = all.results;
    });
    this.loadingController.create({keyboardClose: true,
    message: 'Getting movies for you...'
    }).then(loadingEl => {
      loadingEl.present();
      setTimeout(() => {
        this.isLoading = false;
        loadingEl.dismiss();
      });
    });    
  }

  getMovies() {
    this.isLoading = true;
    this.moviesService.getMovies().subscribe(movie => {
      this.movies = movie.results;
    });
    this.loadingController.create({keyboardClose: true,
      message: 'Getting movies for you...'
      }).then(loadingEl => {
        loadingEl.present();
        setTimeout(() => {
          this.isLoading = false;
          loadingEl.dismiss();
        });
      });
  }

  setSearchbarValue(event) {
    this.query = event.detail.value;
    if (this.query === '') {
      this.getMovies();
    } else {
      this.getAllMovies();
    }
  }

  onOpenMenu() {
    this.menu.toggle();
  }

  ngOnDestroy() {
    if (this.movieSub) {
      this.movieSub.unsubscribe();
    }
  }
}
