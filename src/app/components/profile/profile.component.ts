import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../services/authentication.service';
import { BlogService } from '../../services/blog.service';
import { PostModel } from '../../models/post.model';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details: UserDetails;
  blogPosts: PostModel[] = [];
  followers: [any, any][] = [];
  following: [any, any][] = [];

  constructor(private auth: AuthenticationService, public userService: UserService,
              private blogService: BlogService, private router: Router) {
  }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;

      // refresh service
      this.userService.refreshUser();

      setTimeout(() => {
        this.fillFollow();
        console.log(this.following);
        console.log(this.followers);
      }, 100);

      // get posts of user
      this.blogService.getAllBlogPostsByUserId(this.details._id).subscribe((res) => {
        this.blogPosts = res;
        console.log(res);
      }, (err) => {
        console.log(err);
      });

    }, (err) => {
      console.error(err);
    });

  }

  fillFollow() {
    for (const following of this.userService.user.following) {
      this.userService.getUserById(following).subscribe((res) => {
        this.following.push([following, res.name]);
      });
    }
    for (const follower of this.userService.user.followers) {
      this.userService.getUserById(follower).subscribe((res) => {
        this.followers.push([follower, res.name]);
      });
    }
  }

  goToPage(id: string, url: string) {
    this.router.navigate([url, id]);
  }
}
