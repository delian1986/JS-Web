import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { Observable } from 'rxjs';
import { RecipeListModel } from '../models/recipe-list.model';
import { Store, select } from '../../../../node_modules/@ngrx/store';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes$: Observable<RecipeListModel[]>;

  constructor(
    private recipeService : RecipeService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.recipeService
      .getAllRecipe()
      .subscribe(() => {
        this.recipes$ = this.store
          .pipe(select(state => state.recipes.all));
      });
  }
}
