import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { PostModel } from '../../models/post.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-publish',
  templateUrl: './publish.component.html',
  styleUrls: ['./publish.component.css']
})
export class PublishComponent implements OnInit {

  post: PostModel = new PostModel();
  private = false;

  constructor(private blogService: BlogService, private auth: AuthenticationService, private router: Router) {
  }

  ngOnInit() {
  }

  publish() {
    if (this.auth.getUserDetails() != null) {
      this.post.userName = this.auth.getUserDetails().name;
      this.post.userId = this.auth.getUserDetails()._id;
      if (this.private) {
        this.post.private = 'true';
      } else {
        this.post.private = 'false';
      }
      this.post.created = Date.now();

      this.blogService.publishPost(this.post).subscribe((res) => {
        console.log(res);
        this.router.navigateByUrl('/profile');
      }, (err) => {
        console.log(err);
      });
    } else {
      this.router.navigateByUrl('/');
    }

  }

  toggle() {
    this.private = !this.private;
    console.log(this.private);
  }

}
