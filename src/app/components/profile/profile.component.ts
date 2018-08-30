import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../services/authentication.service';
import { BlogService } from '../../services/blog.service';
import { PostModel } from '../../models/post.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Observable } from 'rxjs';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details: UserDetails;
  blogPosts: PostModel[] = [];
  followers: [any, Observable<any>][] = [];
  following: [any, Observable<any>][] = [];

  constructor(private auth: AuthenticationService, public userService: UserService,
              private blogService: BlogService, private router: Router,
              private loader: NgxUiLoaderService) {
  }

  ngOnInit() {
    this.loader.start();
    this.auth.profile().subscribe(user => {
      this.details = user;

      // refresh service
      this.userService.refreshUser();

      setTimeout(() => {
        this.fillFollow();
      }, 500);

      // get posts of user
      this.blogService.getAllBlogPostsByUserId(this.details._id).subscribe((res) => {
        this.blogPosts = res;
        this.loader.stop();
        // console.log(res);
      }, (err) => {
        console.log(err);
      });

    }, (err) => {
      console.error(err);
    });

  }

  fillFollow() {
    for (const following of this.userService.user.following) {
      this.following.push([following, this.userService.getUserById(following)]);
    }
    for (const follower of this.userService.user.followers) {
      this.followers.push([follower, this.userService.getUserById(follower)]);
    }
  }

  goToPage(id: string, url: string) {
    this.router.navigate([url, id]);
  }
}
