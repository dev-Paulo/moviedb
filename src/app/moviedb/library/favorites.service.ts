import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take, tap, switchMap, map } from 'rxjs/operators';
import { Favorite } from './favorite.model';
import { AuthService } from '../../auth/auth.service';

interface FavoriteData {
  id: string;
  backdrop_path: string;
  original_title: string;
  overview: string;
  release_date: Date;
  title: string;
  vote_average: number;
  userId: string;
}

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
// tslint:disable-next-line: variable-name
  private _favorites = new BehaviorSubject<Favorite[]>([]);

  get favorites() {
    return this._favorites.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) { }

  addFavorite(
    userId: string,
// tslint:disable-next-line: variable-name
    backdrop_path: string,
// tslint:disable-next-line: variable-name
    original_title: string,
    overview: string,
// tslint:disable-next-line: variable-name
    release_date: Date,
    title: string,
// tslint:disable-next-line: variable-name
    vote_average: number,
  ) {
    let generatedId: string;
    let newFavorite: Favorite;
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
// tslint:disable-next-line: no-shadowed-variable
      switchMap(userId => {
        if (!userId) {
          throw new Error('No user id found!');
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        newFavorite = new Favorite(
          Math.random().toString(),
          userId,
          backdrop_path,
          overview,
          release_date,
          title,
          vote_average
        );
        return this.http
        .post<{ name: string }>(
          `https://moviedbteste.firebaseio.com/favorites.json?auth=${token}`,
          { ...newFavorite, id: null}
        );
      }),
      switchMap(resData => {
        generatedId = resData.name;
        return this.favorites;
      }),
      take(1),
      tap(favorites => {
        newFavorite.id = generatedId;
        this._favorites.next(favorites.concat(newFavorite));
      })
    );
  }

  deleteFavorite(favoriteId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.delete(
          `https://moviedbteste.firebaseio.com/favorites/${favoriteId}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.favorites;
      }),
      take(1),
      tap(favorites => {
        this._favorites.next(favorites.filter(f => f.id !== favoriteId));
      })
    );
  }

  fetchFavorites() {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        if (!userId) {
          throw new Error('User not found');
        }
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        return this.http
          .get<{ [key: string]: FavoriteData }>(
            `https://moviedbteste.firebaseio.com/favorites.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
          );
      }),
      map(favoriteData => {
        const favorites = [];
        for (const key in favoriteData) {
          if (favoriteData.hasOwnProperty(key)) {
            favorites.push(
              new Favorite(
                key,
                favoriteData[key].userId,
                favoriteData[key].backdrop_path,
                favoriteData[key].overview,
                new Date(favoriteData[key].release_date),
                favoriteData[key].title,
                favoriteData[key].vote_average
                )
            );
          }
        }
        return favorites;
      }),
      tap(favorites => {
        this._favorites.next(favorites);
      })
    );
  }

}
