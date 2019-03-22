import { Injectable } from '@angular/core';

const BASE_URL = 'https://api.themoviedb.org/3/'
const API_KEY= '&api_key=f0053415118002a5f05ea08cc3e5eee8'

@Injectable({
  export class MoviesService{
    popularEndpoint='discover/movie?sort_by=popularity.desc'
  }
})
export class MoviesService {

  constructor() { }
}
