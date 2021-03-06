import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { BlogService } from '../../services/blog.service';
import { PostModel } from '../../models/post.model';
import { AuthenticationService } from '../../services/authentication.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html'
})
export class UserComponent implements OnInit {

  user: UserModel;
  blogPosts: PostModel[] = [];
  isFollowing = false;

  constructor(private userService: UserService, private blogService: BlogService,
              public auth: AuthenticationService, private router: Router,
              private activeRoute: ActivatedRoute, private loader: NgxUiLoaderService) {
  }

  ngOnInit() {
    // refresh service
    this.userService.refreshUser();

    const queryParams = this.activeRoute.snapshot.params;

    this.loader.start();
    this.userService.getUserById(queryParams.id).subscribe((res) => {
      // console.log(res);
      this.user = res;

      // check if logged in user is following
      this.isFollowing = this.userService.isFollowing(this.user._id);

      // get posts of user
      this.blogService.getAllBlogPostsByUserId(this.user._id).subscribe((result) => {
        this.blogPosts = result;
        this.loader.stop();
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      this.router.navigateByUrl('/');
      console.log(err);
    });
  }

  follow() {
    this.userService.follow(this.user._id).subscribe((res) => {
      console.log(res);

      // change status
      this.userService.user.following.push(this.user._id);
      this.isFollowing = this.userService.isFollowing(this.user._id);
      // console.log(this.isFollowing);

    }, (err) => {
      console.log(err);
    });
  }

  unfollow() {
    this.userService.unfollow(this.user._id).subscribe((res) => {
      console.log(res);

      // delete follower
      const index = this.userService.user.following.indexOf(this.user._id);
      this.userService.user.following.splice(index);

      // change status
      this.isFollowing = this.userService.isFollowing(this.user._id);
    }, (err) => {
      console.log(err);
    });
  }

  goToPage(id: string, url: string) {
    this.router.navigate([url, id]);
  }

}
