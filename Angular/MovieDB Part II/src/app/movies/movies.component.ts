import { Component, OnInit} from '@angular/core';
import Movie from '../models/movie';
import { MoviesService } from '../service/movies.service';
import { DataService } from '../service/data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  popularMovies: Array<Movie>
  theaterMovies: Array<Movie>
  kidsMovies: Array<Movie>
  dramaMovies: Array<Movie>
  searchResults: Array<Movie> = Array()

  query: string
  lastQueryVal: string = ''

  constructor(
    private moviesService: MoviesService,
    private data: DataService,
    private route: ActivatedRoute,

  ) { }

  ngOnInit() {
    const [
      dramas,
      kids,
      popular,
      theaters
    ] = this.route.snapshot.data['allMovies']

    this.dramaMovies = dramas
    this.kidsMovies = kids
    this.popularMovies = popular
    this.theaterMovies = theaters

    this.data.currentQuery.subscribe(query => this.query = query)
  }

  ngDoCheck(): void {
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.
    if (this.query && this.query !== this.lastQueryVal) {
      // debugger
      this.lastQueryVal = this.query
      this.searchMovies()
    }
  }

  searchMovies() {
    this.moviesService.search(this.query).subscribe(data => {
      this.searchResults = data['results'].splice(0, 6)
    })
  }
}