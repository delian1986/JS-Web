import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../service/movies.service';

@Component({
  selector: 'app-jumbothron',
  templateUrl: './jumbothron.component.html',
  styleUrls: ['./jumbothron.component.css']
})
export class JumbothronComponent implements OnInit {

  constructor(
    private movieService: MoviesService
  ) { }

  ngOnInit() {
  }

  search(form:NgForm){
    console.log(form);
    const query= form.value.query
    debugger
  }

}
