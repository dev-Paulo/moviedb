import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface MovieData {
  id: number;
  discoverUrl: string;
  overview: string;
  movieUrl: string;
  imageUrl: string;
  title: string;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

// tslint:disable-next-line: max-line-length
  discoverUrl = 'https://api.themoviedb.org/3/discover/movie?api_key=2a6feadc6ed809a90e8e3b1fea92835a';
  movieUrl = 'https://api.themoviedb.org/3/search/movie?api_key=2a6feadc6ed809a90e8e3b1fea92835a&language=en-US&query=';
  imageUrl = 'http://image.tmdb.org/t/p/w185';

  constructor(private http: HttpClient) { }

  getAllMovies(query) {
    return this.http.get<[]>(this.movieUrl + query);
  }

  getMovies() {
    return this.http.get<[]>(this.discoverUrl);
  }
 }
