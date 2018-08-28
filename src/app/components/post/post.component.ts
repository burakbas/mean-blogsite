import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from '../../models/post.model';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  blogPost: PostModel;

  constructor(private blogService: BlogService, private router: Router,
              public auth: AuthenticationService, private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const queryParams = this.activeRoute.snapshot.params;

    this.blogService.getBlogPostById(queryParams.id).subscribe((res) => {
      this.blogPost = res;
      console.log(res);
    }, (err) => {
      this.router.navigateByUrl('/');
      console.log(err);
    });
  }

}
