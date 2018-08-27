import { Component, OnInit } from '@angular/core';
import { AuthenticationService, UserDetails } from '../../services/authentication.service';
import { BlogService } from '../../services/blog.service';
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  details: UserDetails;
  blogPosts: PostModel[] = [];

  constructor(private auth: AuthenticationService, private blogService: BlogService) {
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

}
