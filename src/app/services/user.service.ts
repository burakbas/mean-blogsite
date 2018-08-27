import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  private token: string;

  constructor(private http: HttpClient, private router: Router) {
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
