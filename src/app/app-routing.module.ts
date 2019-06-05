import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'moviedb', pathMatch: 'full'},
  { path: 'moviedb', loadChildren: './moviedb/moviedb.module#MoviedbPageModule'},
  { path: 'discover', loadChildren: './moviedb/discover/discover.module#DiscoverPageModule'},

];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
