import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import MovieDetails from 'src/app/movie-details/movie-details-interface';
import { MoviesService } from '../movies.service';

@Injectable()
export class SingleMovieResolver implements Resolve<MovieDetails>{

    constructor(private movieService:MoviesService){}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id= route.params['id']

        return this.movieService.getMovie(id)
    }

}