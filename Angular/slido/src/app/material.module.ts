import { NgModule } from "@angular/core";
import {
    MatButtonModule, 
    MatIconModule,  
    MatSidenavModule,  
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule
} from '@angular/material'
import {MatToolbarModule} from '@angular/material/toolbar';

@NgModule({
    imports:[
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatPaginatorModule
    ],
    exports:[
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSidenavModule,
        MatListModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatSnackBarModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatTableModule,
        MatPaginatorModule


    ]
})

export class MaterialModule{}