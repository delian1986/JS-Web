import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-sidebar-toolbar',
  templateUrl: './sidebar-toolbar.component.html',
  styleUrls: ['./sidebar-toolbar.component.css']
})
export class SidebarToolbarComponent implements OnInit {
  @Output() onToggleSidenav = new EventEmitter<void>()

  isAuth: boolean;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isAuthChanged.subscribe((data) => {
      this.isAuth = data;
    })
  }

  toggleSideNav() {
    this.onToggleSidenav.emit();
  }

  logout() {
    this.authService.logout();
  }

}
