import { Component } from '@angular/core';
import { AuthService } from '@mdv-twenty-four/core-data';

@Component({
  selector: 'mdv-twenty-four-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // title = 'dashboard';

  links = [
    { path: '/pokemon', icon: 'work', title: 'Pokemon' }
  ]

  userIsAuthenticated = this.authService.isAuthenticated;
  constructor(private authService: AuthService) {}
}
