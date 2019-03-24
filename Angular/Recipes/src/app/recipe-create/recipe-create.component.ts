import { Component, OnInit } from '@angular/core';
import { RecipeCreate } from '../models/recipe-create.model';
import { RecipeService } from '../recipe.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-create',
  templateUrl: './recipe-create.component.html',
  styleUrls: ['./recipe-create.component.css']
})

export class RecipeCreateComponent implements OnInit {
  bindingModel:RecipeCreate


  constructor(
    private recipeService:RecipeService,
    private toastr:ToastrService,
    private router: Router
  ) { 
    this.bindingModel=new RecipeCreate("","","")
  }

  ngOnInit() {

  }

  create(){
      this.recipeService.create(this.bindingModel)
      .subscribe(data=>{
        console.log(data)
        this.toastr.success('Recipe Created')
        this.router.navigate(['/recipes/list'])
      })
      
  }

}
