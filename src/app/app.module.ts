import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AuthenticationService } from './services/authentication.service';
import { PostComponent } from './components/post/post.component';
import { PublishComponent } from './components/publish/publish.component';
import { BlogService } from './services/blog.service';
import { UserComponent } from './components/user/user.component';
import { UserService } from './services/user.service';
import { CategoryComponent } from './components/category/category.component';
import { UniquePipe } from './tools/unique.pipe';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import { NgxPaginationModule } from 'ngx-pagination';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService] },
  { path: 'publish', component: PublishComponent, canActivate: [AuthGuardService] },
  { path: 'user/:id', component: UserComponent, canActivate: [AuthGuardService] },
  { path: 'post/:id', component: PostComponent },
  { path: 'category/:category', component: CategoryComponent }
];
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ProfileComponent,
    RegisterComponent,
    PostComponent,
    PublishComponent,
    UserComponent,
    CategoryComponent,
    UniquePipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    NgxUiLoaderModule,
    NgxPaginationModule
  ],
  providers: [
    AuthenticationService,
    AuthGuardService,
    BlogService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
