import { NgModule } from "@angular/core";
import { RecipeCreate } from './models/recipe-create.model';
import { RecipeCreateComponent } from './recipe-create/recipe-create.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeRoutingModule } from './recipe-routing.module';

@NgModule({
    declarations:[
        RecipeCreateComponent,
        RecipeListComponent,
        RecipeEditComponent,
        RecipeDetailsComponent,
        RecipeStartComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        RecipeRoutingModule
    ]
})

export class RecipeModule { }