import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import Movie from '../models/movie';
import { map } from 'rxjs/operators';
import MovieDetails from '../movie-details/movie-details-interface';

const BASE_URL = 'https://api.themoviedb.org/3/'
const API_KEY_SEARCH='api_key=f0053415118002a5f05ea08cc3e5eee8'
const API_KEY = '&api_key=f0053415118002a5f05ea08cc3e5eee8'
const API_KEY_ALT = '?api_key=f0053415118002a5f05ea08cc3e5eee8'

@Injectable()
export class MoviesService {
  popularEndpoint = 'discover/movie?sort_by=popularity.desc'
  theatersEndpoint = 'discover/movie?primary_release_date.gte=2018-07-15&primary_release_date.lte=2019-02-01'
  kidsEndpoint = 'discover/movie?certification_country=US&certification.lte=G&sort_by=popularity.desc';
  dramasEndpoint = 'discover/movie?with_genres=18&sort_by=vote_average.desc&vote_count.gte=10';
  searchMovieEndpoint = 'search/movie?';


  constructor(private http: HttpClient) { }

  getPopular(){
    return this.http.get<Movie[]>(BASE_URL + this.popularEndpoint + API_KEY)
    .pipe(map((data)=>data['results'].slice(0,6)))
  }

  getTheaters() {
    return this.http.get<Movie[]>(BASE_URL + this.theatersEndpoint + API_KEY)
    .pipe(map((data)=>data['results'].slice(0,6)))
  }

  getKids() {
    return this.http.get<Movie[]>(BASE_URL + this.kidsEndpoint + API_KEY)
    .pipe(map((data)=>data['results'].slice(0,6)))
  }

  getDramas() {
    return this.http.get<Movie[]>(BASE_URL + this.dramasEndpoint + API_KEY)
    .pipe(map((data)=>data['results'].slice(0,6)))
  }

  getMovie(id:string){
    return this.http.get<MovieDetails>(BASE_URL + `movie/${id}` + API_KEY_ALT);
  }

  search(query:string){
    return this.http.get<Movie>(BASE_URL+this.searchMovieEndpoint+API_KEY_SEARCH+'&query='+query)
  }
}
