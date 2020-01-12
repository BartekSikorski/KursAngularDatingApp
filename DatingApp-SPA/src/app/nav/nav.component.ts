import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { AletifyService } from '../_services/aletify.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authmodel: any = {};
  photoUrl: string;

  constructor(public authService: AuthService, public alertify: AletifyService,
    public router: Router) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login() {
    this.authService.login(this.authmodel).subscribe(
      next => {
        this.alertify.success('Loged in sucessfully');
      }, error => {
        this.alertify.error('Log in failed');
      }, () => {
        this.router.navigate(['/members']);
      }
    );
  }

  logedIn() {
    return this.authService.logedIn();
  }

  logedOut() {
    const token = localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.currentUser = null;
    this.alertify.message('loged out');
    this.router.navigate(['/home']);

  }

}
