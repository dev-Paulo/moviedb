import { Component, OnInit } from '@angular/core';
import { MoviesService } from 'src/app/movies.service';
import { NavController,
  LoadingController,
  AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { Subscription } from 'rxjs';
import { IMovie } from '../../movie.model';


@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.page.html',
  styleUrls: ['./movie-detail.page.scss'],
})
export class MovieDetailPage implements OnInit {
  movie: IMovie;
  isLoading = false;
  public movies = [];

  constructor(
    private moviesService: MoviesService, 
    private navCtrl: NavController,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController,
    ) { }

  ngOnInit() {

    console.log(movie);
   /*  this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('userId')) {
        console.log('no user ID');
        //this.navCtrl.navigateBack('/moviedb/tabs/discover');        
        return;
      }
      this.isLoading = true;
      let fetchedUserId: string;
      this.authService.userId
      .pipe(
        take(1),
        switchMap(userId => {
          if (!userId) {
            throw new Error('Found no user');
          }
          fetchedUserId = userId;
          return this.moviesService.getMovies();
        })).subscribe(
          movies => {
            this.movies = movies.results;
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
            .create({
              header: 'An error ocurred!',
              message: 'Could not load place.',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    this.router.navigate(['/moviedb/tabs/discover']);
                  }
                }
              ]
            }).then(
              alertEl => alertEl.present());
          }
        );
    });
  } */
}
}
