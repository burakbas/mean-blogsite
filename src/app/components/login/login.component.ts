import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../styles/styles.css']
})
export class LoginComponent {

  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  message: string;

  constructor(private auth: AuthenticationService, private router: Router) {
  }

  login() {
    this.auth.login(this.credentials).subscribe((res) => {
      // console.log(res);
      this.router.navigateByUrl('/profile');
    }, (err) => {
      this.message = err.error.message;
      console.error(err);
    });
  }

}
