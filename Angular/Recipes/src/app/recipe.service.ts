import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'
import { RecipeList } from './models/recipe-list.model';
import { Observable, pipe } from 'rxjs';
import { RecipeCreate } from './models/recipe-create.model';

const BASE_URL = 'https://anguralexercise.firebaseio.com/recipes/'

@Injectable({
    providedIn: 'root'
})
export class RecipeService {
    constructor(
        private http: HttpClient,
    ) { }

    getAll() {
        return this.http.get(`${BASE_URL}.json`)
            .pipe(map((res: Response) => {
                    const ids=Object.keys(res)
                    const recipes:RecipeList[]=[]

                    for (const i of ids) {
                        recipes.push(new RecipeList(
                            i,
                            res[i].name,
                            res[i].imagePath,
                            res[i].description))
                    }

                    return recipes
            }))

    }

    create(body:RecipeCreate) {
        return this.http.post(`${BASE_URL}.json`,body)
    }

    getById(id:string){
        return this.http.get<RecipeList>(`${BASE_URL}${id}/.json`)
    }

    edit(body){
        return this.http.patch(`${BASE_URL}.json`,body)
    }

    delete(id:string){
        return this.http.delete(`${BASE_URL}${id}/.json`)
    }
}