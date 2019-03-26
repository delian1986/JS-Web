import { NgModule } from "@angular/core";
import { furnitureComponents } from ".";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { FurnitureService } from "./furniture.service";
import { FurnitureRoutingModule } from "./furniture.routing.module";
import { CommonModule } from "@angular/common";
import {NgxPaginationModule} from 'ngx-pagination';
import { ToastrService } from "ngx-toastr";

@NgModule({
    declarations:[
        ...furnitureComponents,
    ],
    imports:[
        CommonModule,
        FormsModule,
        RouterModule,
        FurnitureRoutingModule,
        NgxPaginationModule

    ],
    providers:[
        FurnitureService,
        ToastrService
    ],
    exports:[
        CommonModule
    ]
})
export class FurnitureModule{}