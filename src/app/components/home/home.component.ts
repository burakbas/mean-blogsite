import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { BlogService } from '../../services/blog.service';
import { PostModel } from '../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogPosts: PostModel[] = [];

  constructor(public auth: AuthenticationService, private blogService: BlogService, private router: Router) {
  }

  ngOnInit() {
    this.blogService.getAllBlogPosts().subscribe((res) => {
      this.blogPosts = res;
      console.log(this.blogPosts);
    }, (err) => {
      console.log(err);
    });
  }

  goToPage(id: string, url: string) {
    this.router.navigate([url, id]);
  }

}
