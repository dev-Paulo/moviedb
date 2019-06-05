import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../movies.service';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.page.html',
  styleUrls: ['./discover.page.scss'],
})
export class DiscoverPage implements OnInit {

  public movies = [];
  public filteredMovies = [...this.movies];
  imageUrl = 'http://image.tmdb.org/t/p/w500';


  constructor(public moviesService: MoviesService) { }

  ngOnInit() {
   this.moviesService.getMovies().subscribe(movies => {
     console.log(movies);
     this.movies = movies.results; 
     this.filteredMovies = [...this.movies];
   });  
  }

  public searchMovies(event){
    if (event.detail.value && event.detail.value.trim() !== '') {
      this.movies = this.filteredMovies ;
      this.movies = this.movies.filter((item) => {
        return (item.title.toLowerCase().indexOf(event.detail.value.toLowerCase()) > -1);
      });
    } else {
      this.movies = this.filteredMovies ;
    }
  }
}
