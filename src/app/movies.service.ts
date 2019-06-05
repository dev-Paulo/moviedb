import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

// tslint:disable-next-line: max-line-length
  movieUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=2a6feadc6ed809a90e8e3b1fea92835a&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1';
  searchUrl = 'https://api.themoviedb.org/3/search/movie?api_key=2a6feadc6ed809a90e8e3b1fea92835a&language=en-US&query=';
  imageUrl = 'http://image.tmdb.org/t/p/w185';

  constructor(private http: HttpClient) { }

  getMovies(): Observable<[]> {
    return this.http.get<[]>(this.movieUrl);
  }
 }
