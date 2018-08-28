import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class UserService {
  private token: string;
  user: UserModel;

  constructor(private http: HttpClient, private auth: AuthenticationService) {
    this.refreshUser();
  }

  public refreshUser() {
    if (this.auth.getUserDetails()) {
      this.getUserById(this.auth.getUserDetails()._id).subscribe((res) => {
        // console.log('User set');
        // console.log(res);
        this.user = res;
      });
    }
  }

  public follow(id: string): Observable<any> {
    return this.http.post('/api/follow/' + id, null, {
      headers: {Authorization: `Bearer ${this.getToken()}`},
      responseType: 'text'
    });
  }

  public unfollow(id: string): Observable<any> {
    return this.http.delete('/api/follow/' + id, {
      headers: {Authorization: `Bearer ${this.getToken()}`},
      responseType: 'text'
    });
  }

  public isFollowing(id: string): boolean {
    return this.user.following.includes(id);
  }

  public getUserById(id: string): Observable<any> {
    return this.http.get('/api/user/' + id, {headers: {Authorization: `Bearer ${this.getToken()}`}});
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem('token');
    }
    return this.token;
  }

}
