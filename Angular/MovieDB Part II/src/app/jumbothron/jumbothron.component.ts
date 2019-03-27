import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { DataService } from '../service/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jumbothron',
  templateUrl: './jumbothron.component.html',
  styleUrls: ['./jumbothron.component.css']
})
export class JumbothronComponent implements OnInit {
  query: string

  constructor(
    private data: DataService,
    private route: Router
  ) { }

  ngOnInit() {
    this.data.currentQuery.subscribe(query => this.query = query)
  }

  search(form: NgForm) {
    const queryValue = form.value.query

    this.data.changeQuery(queryValue)

    this.checkRoute(queryValue)
  }

  checkRoute(queryValue) {
    if (queryValue && this.route.url !== '/') {
      this.route.navigate(['/'])
    }
  }

}
