import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserModel } from '../../models/user.model';
import { BlogService } from '../../services/blog.service';
import { PostModel } from '../../models/post.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: UserModel;
  blogPosts: PostModel[] = [];

  constructor(private userService: UserService, private blogService: BlogService, private router: Router,
              private activeRoute: ActivatedRoute) {
  }

  ngOnInit() {
    const queryParams = this.activeRoute.snapshot.params;

    this.userService.getUserById(queryParams.id).subscribe((res) => {
      console.log(res);
      this.user = res;
      // get posts of user
      this.blogService.getAllBlogPostsByUserId(this.user._id).subscribe((result) => {
        this.blogPosts = result;
        console.log(result);
      }, (err) => {
        console.log(err);
      });
    }, (err) => {
      this.router.navigateByUrl('/');
      console.log(err);
    });
  }

  goToPage(id: string, url: string) {
    this.router.navigate([url, id]);
  }

}
