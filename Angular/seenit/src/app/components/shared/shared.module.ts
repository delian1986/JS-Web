import { ContentComponent } from "./content/content.component";
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


@NgModule({
    declarations:[
        ContentComponent,
        FooterComponent,
        HeaderComponent,

    ],
    imports:[
        CommonModule,
        RouterModule
    ],
    exports:[
        ContentComponent,
        FooterComponent,
        HeaderComponent
    ]
})
export class SharedModule{}