import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MoviesService } from '../movies.service';
import Movie from 'src/app/models/movie';
import { forkJoin } from 'rxjs';

@Injectable()
export class MoviesResolver implements Resolve<Movie[]>{

    constructor(private movieService:MoviesService){}

    resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return forkJoin(
            this.movieService.getDramas(),
            this.movieService.getKids(),
            this.movieService.getPopular(),
            this.movieService.getTheaters()
        )
    }

}