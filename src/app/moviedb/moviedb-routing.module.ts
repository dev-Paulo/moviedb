import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviedbPage } from './moviedb.page';

const routes: Routes = [

    {
        path: 'tabs',
        component: MoviedbPage,
        children: [
            {
                path: 'discover',
                children: [
                    {
                        path: '',
                        loadChildren: './discover/discover.module#DiscoverPageModule'
                    },                    
                    {
                        path: ':movieId',
                        loadChildren: './discover/movie-detail/movie-detail.module#MovieDetailPageModule'
                    }
                ]
            },
            {
                path: 'library',
                children: [
                    {
                        path: '',
                        loadChildren: './library/library.module#LibraryPageModule'
// tslint:disable-next-line: whitespace
                    },]
            },
            {
                path: 'account',
                children: [
                    {
                        path: '',
                        loadChildren: './account/account.module#AccountPageModule'
                    },
                ]
            },
            {
                path: '',
                redirectTo: '/moviedb/tabs/discover',
                pathMatch: 'full'
            }
        ]
    },
    {
        path: '',
        redirectTo: '/moviedb/tabs/discover',
        pathMatch: 'full'
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class MoviedbRoutingModule { }
