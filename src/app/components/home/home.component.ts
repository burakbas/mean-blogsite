import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { BlogService } from '../../services/blog.service';
import { PostModel } from '../../models/post.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  allBlogPosts: PostModel[] = [];
  followedBlogPosts: PostModel[] = [];
  showFollowing = false;

  constructor(public auth: AuthenticationService, private userService: UserService,
              private blogService: BlogService, private router: Router,
              private loader: NgxUiLoaderService) {
  }

  ngOnInit() {
    this.userService.refreshUser();
    this.getAllBlogPosts();
    if (this.auth.isLoggedIn()) {
      setTimeout(() => {
        this.getFollowedBlogPosts();
      }, 500);
    }
  }

  getAllBlogPosts() {
    this.loader.start();
    this.blogService.getAllBlogPosts().subscribe((res) => {
      this.allBlogPosts = res;
      this.loader.stop();
      // console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  getFollowedBlogPosts() {
    this.blogService.getFollowedBlogPosts(this.userService.user._id).subscribe((res) => {
      this.followedBlogPosts = res;
      // console.log(res);
    }, (err) => {
      console.log(err);
    });
  }

  goToPage(id: string, url: string) {
    this.router.navigate([url, id]);
  }

}
