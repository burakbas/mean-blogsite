import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../services/authentication.service';
import { BlogService } from '../../services/blog.service';
import { PostModel } from '../../models/post.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details: UserDetails;
  blogPosts: PostModel[] = [];

  constructor(private auth: AuthenticationService, private blogService: BlogService, private router: Router) {
  }

  ngOnInit() {
    this.auth.profile().subscribe(user => {
      this.details = user;

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

  goToPage(id: string, url: string) {
    this.router.navigate([url, id]);
  }
}
