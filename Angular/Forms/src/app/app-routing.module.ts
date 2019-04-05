import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes, } from '@angular/router';
import { TemplateFormComponent } from './template-form/template-form.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

const routes : Routes = [
  { path: '', pathMatch: 'full', component:HomeComponent },
  { path: 'template-driven-form', component: TemplateFormComponent },
  { path: 'reactive-form', component: ReactiveFormComponent }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
