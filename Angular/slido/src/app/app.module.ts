import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { SidebarListComponent } from './components/shared/sidebar-list/sidebar-list.component';
import { SidebarToolbarComponent } from './components/shared/sidebar-toolbar/sidebar-toolbar.component';
import { HomeComponent } from './components/home/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EventLiveComponent } from './components/events/event-live/event-live.component';
import { PostQuestionComponent } from './components/events/post-question/post-question.component';
import { QuestionInfoComponent } from './components/events/question-info/question-info.component';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { AllEventsComponent } from './app/components/events/all-events/all-events.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarListComponent,
    SidebarToolbarComponent,
    HomeComponent,
    EventLiveComponent,
    PostQuestionComponent,
    QuestionInfoComponent,
    LoginComponent,
    RegisterComponent,
    AllEventsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
