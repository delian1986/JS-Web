import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import Movie from '../models/movie';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popularMovies: Array<Movie>
  theaterMovies: Array<Movie>

  constructor(private moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getPopular().subscribe(data => {
      this.popularMovies = data['results'].splice(0, 6)
    })
    this.moviesService.getTheaters().subscribe(data => {
      this.theaterMovies = data['results'].splice(0, 6)
    })

  }

}
