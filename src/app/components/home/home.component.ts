import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { BlogService } from '../../services/blog.service';
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  blogPosts: PostModel[] = [];

  constructor(public auth: AuthenticationService, private blogService: BlogService) { }

  ngOnInit() {
    this.blogService.getAllBlogPosts().subscribe((res) => {
      this.blogPosts = res;
      console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

}
