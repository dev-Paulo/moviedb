import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { MoviedbPage } from './moviedb.page';
import { MoviedbRoutingModule } from './moviedb-routing.module';

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MoviedbRoutingModule
  ],
  declarations: [MoviedbPage]
})
export class MoviedbPageModule {}
