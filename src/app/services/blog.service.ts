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

  public getAllBlogPosts(): Observable<any> {
    return this.http.get('/api/post');
  }

  public getBlogPostById(id: string): Observable<any> {
    return this.http.get('/api/post/' + id);
  }

  public getAllBlogPostsByUserId(userId: string): Observable<any> {
    return this.http.get('/api/post/user/' + userId);
  }

}
