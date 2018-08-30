import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from '../../models/post.model';
import { AuthenticationService } from '../../services/authentication.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  blogPost: PostModel;

  constructor(private blogService: BlogService, private router: Router,
              public auth: AuthenticationService, private activeRoute: ActivatedRoute,
              private loader: NgxUiLoaderService) {
  }

  ngOnInit() {
    const queryParams = this.activeRoute.snapshot.params;
    this.loader.start();
    this.blogService.getBlogPostById(queryParams.id).subscribe((res) => {
      this.blogPost = res;
      this.loader.stop();
      // console.log(res);
    }, (err) => {
      this.router.navigateByUrl('/');
      console.log(err);
    });
  }

}
