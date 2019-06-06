import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies.service';
import { LoadingController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {


  public isLoading = false;
  public query = '';
  public movies = [];
  public filteredMovies = [...this.movies];
  imageUrl = 'http://image.tmdb.org/t/p/w500';


  constructor(public moviesService: MoviesService, private loadingController: LoadingController, private menu: MenuController) { }

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
  /*public searchMovies(event){
    if (event.detail.value && event.detail.value.trim() !== '') {
      this.movies = this.filteredMovies ;
      this.movies = this.movies.filter((item) => {
        return (item.title.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    } else {
      this.movies = this.filteredMovies ;
    }
  }*/
}
