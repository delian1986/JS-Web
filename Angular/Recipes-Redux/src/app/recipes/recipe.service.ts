import { Injectable } from '@angular/core';
import { RecipeCreateModel } from './models/recipe-create.model';
import { AuthService } from '../auth/auth.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { RecipeListModel } from './models/recipe-list.model';
import { Store } from '../../../node_modules/@ngrx/store';
import { AppState } from '../store/app.state';
import { GetAllRecipes, GetRecipeDetail, GetRecipeToEdit } from '../store/actions/recipes.actions';
import { Observable } from '../../../node_modules/rxjs';

const baseUrl = `https://ccccc-61656.firebaseio.com/recipes/`;

@Injectable()
export class RecipeService {
  private recipesCached: boolean = false;

  constructor(
    private authService : AuthService,
    private http : HttpClient,
    private store: Store<AppState>
  ) {}

  createRecipe(body : RecipeCreateModel) {
    const token = this.authService.getToken();

    return this.http.post(`${baseUrl}/.json?auth=${token}`, body);
  }

  getAllRecipe() {
    if (this.recipesCached) {
      return Observable.create();
    }

    const token = this.authService.getToken();

    return this.http.get(`${baseUrl}/.json?auth=${token}`)
      .pipe(map((res: Response) => {
        const items = Object.keys(res);
        const recipes : RecipeListModel[] = [];
        for(let i of items) {
          recipes.push(new RecipeListModel(i, res[i].name, 
            res[i].description, res[i].imagePath));
        }

        this.recipesCached = true;

        this.store.dispatch(new GetAllRecipes(recipes));
      }));
  }

  getById(id : string) {
    return this.getByIdInternal(id, recipe => {
      this.store.dispatch(new GetRecipeDetail(recipe));
    });
  }

  getToEditById(id: string) {
    return this.getByIdInternal(id, recipe => {
      this.store.dispatch(new GetRecipeToEdit(recipe));
    });
  }

  editRecipe(body) {
    const token = this.authService.getToken();

    return this.http.patch(`${baseUrl}/.json?auth=${token}`, body);
  }

  deleteRecipe(id : string) {
    const token = this.authService.getToken();
    
    return this.http.delete(`${baseUrl}${id}/.json?auth=${token}`)
  }

  private getByIdInternal(id: string, callback) {
    const token = this.authService.getToken();

    return this.http
      .get<RecipeListModel>(`${baseUrl}${id}/.json?auth=${token}`)
      .pipe(map((recipe: RecipeListModel) => {
        callback(recipe);
      }));
  }
}

