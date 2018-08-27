import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PostModel } from '../models/post.model';

@Injectable()
export class BlogService {

  constructor(private http: HttpClient, private router: Router) {
  }

  public publishPost(post: PostModel): Observable<any> {
    return this.http.post('/api/publish', post, {
      responseType: 'text',
    });
  }

}
