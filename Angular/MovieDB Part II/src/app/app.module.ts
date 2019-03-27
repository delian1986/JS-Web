import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { NavbarComponent } from './navbar/navbar.component';
import { JumbothronComponent } from './jumbothron/jumbothron.component';
import { FooterComponent } from './footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { MoviesService } from './service/movies.service';
import { MovieComponent } from './movie/movie.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DataService } from './service/data.service';
import { SingleMovieResolver } from './service/resolvers/single-movie.resolver';
import { MoviesResolver } from './service/resolvers/movies.resolver';

@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    NavbarComponent,
    JumbothronComponent,
    FooterComponent,
    MovieComponent,
    MovieDetailsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule
  ],
  providers: [
    MoviesService,
    DataService,
    SingleMovieResolver,
    MoviesResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
