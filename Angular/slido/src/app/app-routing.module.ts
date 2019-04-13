import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { EventLiveComponent } from './components/events/event-live/event-live.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AllEventsComponent } from './app/components/events/all-events/all-events.component';

const routes: Routes = [
  {path:'',pathMatch:'full',component:HomeComponent},
  {path:'home',component:HomeComponent},
  {path:'event/:id/live',component:EventLiveComponent},
  {path:'user/events',component:AllEventsComponent},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
