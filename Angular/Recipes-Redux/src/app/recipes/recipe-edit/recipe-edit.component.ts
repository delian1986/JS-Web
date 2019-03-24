import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '../../../../node_modules/@angular/router';
import { RecipeService } from '../recipe.service';
import { RecipeListModel } from '../models/recipe-list.model';
import { ToastrService } from '../../../../node_modules/ngx-toastr';
import { Store, select } from '../../../../node_modules/@ngrx/store';
import { AppState } from '../../store/app.state';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id : string;
  bindingModel : RecipeListModel;

  constructor(
    private route : ActivatedRoute,
    private recipeService : RecipeService,
    private router : Router,
    private toastr : ToastrService,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.recipeService
      .getToEditById(this.id)
      .subscribe(() => {
        this.store
          .pipe(select(state => state.recipes.toEdit))
          .subscribe(recipeToEdit => this.bindingModel = recipeToEdit);
      });
  }

  onSubmit() {
    const body = {
      [this.id]: {
        'description': this.bindingModel.description,
        'imagePath': this.bindingModel.imagePath,
        'name': this.bindingModel.name
      }
    }

    this.recipeService.editRecipe(body)
      .subscribe(() => {
        this.router.navigate(['/recipes/list']);
        this.toastr.success('Edited item', 'SUCCESS');
      });
  }
}
