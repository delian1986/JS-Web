import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../service/movies.service';
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
  genres:string

  constructor(
    private movieService: MoviesService,
    private route: ActivatedRoute,
  ) 
  {
    this.id = this.route.snapshot.params['id']
  }

  ngOnInit() {
    this.movieService.getMovie(this.id).subscribe((data)=>{
      this.movie=data
    })
  }

}
