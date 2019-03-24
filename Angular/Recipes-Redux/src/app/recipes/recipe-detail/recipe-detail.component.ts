import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { RecipeListModel } from '../models/recipe-list.model';
import { RecipeService } from '../recipe.service';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { Store, select } from '../../../../node_modules/@ngrx/store';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id : string;
  recipe : RecipeListModel;

  constructor(
    private route : ActivatedRoute,
    private recipeService : RecipeService,
    private toastr : ToastrService,
    private router : Router,
    private store: Store<AppState>
  ) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    this.recipeService
      .getById(this.id)
      .subscribe(() => {
        this.store
          .pipe(select(state => state.recipes.detail))
          .subscribe(detail => this.recipe = detail);
      });
  }

  onDeleteRecipe(id : string) {
      this.recipeService.deleteRecipe(id)
        .subscribe(() => {
          this.toastr.success('Deleted recipe', 'SUCCESS!');
          this.router.navigate(['/recipes/list']);
        })
  }

}
