import { Component } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState, getIsAuthenticated } from 'src/app/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent {
  
  isLogged$: Observable<boolean>;

  constructor(
    private store:Store<AppState>
  ) { 
    this.isLogged$=store.select(getIsAuthenticated);
  }


  

}
