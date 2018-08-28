import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { UserModel } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'app';

  constructor(public auth: AuthenticationService, private userService: UserService) {
  }

  resetUserModel() {
    this.userService.user = new UserModel();
  }

}
