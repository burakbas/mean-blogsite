import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AuthenticationService } from '../../services/authentication.service';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  blogPosts: PostModel[] = [];
  category = '';

  constructor(public auth: AuthenticationService, public userService: UserService,
              private blogService: BlogService, private router: Router, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const queryParams = this.activeRoute.snapshot.params;
    this.category = queryParams.category;
    this.blogService.getBlogPostByCategory(this.category).subscribe((res) => {
      // console.log(res);
      this.blogPosts = res;
    }, (err) => {
      console.log(err);
    });
  }

  goToPage(id: string, url: string) {
    this.router.navigate([url, id]);
  }

}
