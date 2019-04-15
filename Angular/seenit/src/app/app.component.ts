import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState, getRouterUrl } from './store';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title='SeenIt';
  url$:Observable<string>;

  constructor(
    store:Store<AppState>
  ) {
    this.url$=store.select(getRouterUrl);
   }

  
}
