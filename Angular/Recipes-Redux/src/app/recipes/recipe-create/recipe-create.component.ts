import { Component } from '@angular/core';
import { RecipeCreateModel } from '../models/recipe-create.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})
export class RecipeCreateComponent {
  bindingModel : RecipeCreateModel;

  constructor(
    private recipeService : RecipeService,
    private router : Router,
    private toastr : ToastrService
  ) {
    this.bindingModel = new RecipeCreateModel("", "", "");
  }

  onSubmit() {
    this.recipeService
      .createRecipe(this.bindingModel)
      .subscribe(() => {
        this.router.navigate(['/recipes/list']);
        this.toastr.success('Recipe created!', 'Success!');
      })
  }
}
