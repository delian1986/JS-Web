import { Component, OnInit, Input } from '@angular/core';
import Movie from '../models/movie';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit {
  @Input()
  movie:Movie

  constructor(
    private router:RouterModule
  ) { }

  ngOnInit() {
  }

}
