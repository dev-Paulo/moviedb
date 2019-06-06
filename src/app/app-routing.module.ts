import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'moviedb/tabs/discover', pathMatch: 'full'},
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'moviedb', 
    loadChildren: './moviedb/moviedb.module#MoviedbPageModule',
    canLoad: [AuthGuard]
  },  
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
