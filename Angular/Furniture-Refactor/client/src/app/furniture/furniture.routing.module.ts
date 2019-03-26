import { Routes, RouterModule } from "@angular/router";
import { AllFurnitureComponent } from "./all-furniture/all-furniture.component";
import { FurnitureDetailsComponent } from "./furniture-details/furniture-details.component";
import { MyFurnitureComponent } from "./my-furniture/my-furniture.component";
import { CreateFurnitureComponent } from "./create-furniture/create-furniture.component";
import { NgModule } from "@angular/core";
import { FurnitureEditComponent } from "./furniture-edit/furniture-edit.component";

const furnitureRoutes:Routes=[
    {path:'all',component:AllFurnitureComponent},
    {path:'details/:id',component:FurnitureDetailsComponent},
    {path:'my',component:MyFurnitureComponent},
    {path:'create',component:CreateFurnitureComponent},
    {path:'edit/:id',component:FurnitureEditComponent}
]

@NgModule({
    imports:[
        RouterModule.forChild(furnitureRoutes)
    ],
    exports:[
        RouterModule
    ]
})
export class FurnitureRoutingModule{}