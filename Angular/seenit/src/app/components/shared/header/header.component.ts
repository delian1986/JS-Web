import { Component} from '@angular/core';
import { AppState, getIsAuthenticated, getAuthUsername } from 'src/app/store';
import { Store } from '@ngrx/store';
import { Logout } from 'src/app/store/auth/actions';
import { Observable } from 'rxjs';
import { getUsername } from 'src/app/store/auth/selectors';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  username$: Observable<string>;
  isLogged$: Observable<boolean>;
  constructor(
    private store:Store<AppState>
  ) {
    this.isLogged$=this.store.select(getIsAuthenticated);
    this.username$=this.store.select(getAuthUsername);
   }

  logout() {
   this.store.dispatch(new Logout());
  }
}
