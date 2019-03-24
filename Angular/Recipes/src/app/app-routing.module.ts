import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';
import { RecipeModule } from './recipe.module';

const routes: Route[] = [
  {
    path: 'auth', children: [
      { path: 'login', component: SigninComponent },
      { path: 'register', component: SignupComponent },
    ]
  },
  {
    path:'recipes',
    loadChildren:()=>RecipeModule,
    canActivate:[AuthGuard]
  },
  {
    path:'**',redirectTo:'/auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
