import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../../services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../../styles/styles.css']
})
export class RegisterComponent {

  credentials: TokenPayload = {
    email: '',
    name: '',
    password: ''
  };

  message: string;

  constructor(private auth: AuthenticationService, private router: Router) {}

  register() {
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      this.message = err.error;
      console.error(err);
    });
  }

}
