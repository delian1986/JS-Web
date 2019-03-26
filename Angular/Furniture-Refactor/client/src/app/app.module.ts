import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http'
import { AppRoutingModule } from './app.routing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {ToastrModule} from 'ngx-toastr'
import { CustomFormsModule } from 'ng2-validation'


import { AppComponent } from './app.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { AuthModule } from './authentication/auth.module';
import { FurnitureModule } from './furniture/furniture.module';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,

  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    CustomFormsModule,
    AuthModule,
    HttpModule,
    FurnitureModule
  ],
  providers: [ 
    {
      provide:HTTP_INTERCEPTORS,
      useClass:JwtInterceptor,
      multi:true
    },
    {
      provide:HTTP_INTERCEPTORS,
      useClass:ErrorInterceptor,
      multi:true
    },
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
