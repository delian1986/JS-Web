import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import Movie from '../models/movie';
import { Observable } from 'rxjs';

const BASE_URL = 'https://api.themoviedb.org/3/'
const API_KEY = '&api_key=f0053415118002a5f05ea08cc3e5eee8'

@Injectable()
export class MoviesService {
  popularEndpoint = 'discover/movie?sort_by=popularity.desc'
  theatersEndpoint = 'discover/movie?primary_release_date.gte=2018-07-15&primary_release_date.lte=2019-02-01'

  constructor(private http: HttpClient) { }

  getPopular():Observable<Array<Movie>> {
    return this.http.get<Movie[]>(BASE_URL + this.popularEndpoint + API_KEY)
  }

  getTheaters(){
    return this.http.get<Movie[]>(BASE_URL + this.theatersEndpoint + API_KEY)
  }
}
