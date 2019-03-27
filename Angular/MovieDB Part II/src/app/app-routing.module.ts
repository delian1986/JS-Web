import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { SingleMovieResolver } from './service/resolvers/single-movie.resolver';
import { MoviesResolver } from './service/resolvers/movies.resolver';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full', 
    component: MoviesComponent,
    resolve:{ allMovies:MoviesResolver}
   },
  {
    path: 'movie/:id',
    component: MovieDetailsComponent,
    resolve: 
    { singleMovie: SingleMovieResolver}
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
