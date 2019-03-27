import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import MovieDetails from './movie-details-interface';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movie: MovieDetails
  id: string

  constructor(
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit() {
    this.movie = this.route.snapshot.data['singleMovie']
    this.movie.genres = this.movie.genres.map(x => x['name'])
  }

}
