import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';
import { AletifyService } from '../_services/aletify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authmodel: any = {};

  constructor(public authService: AuthService, private alertify: AletifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.authmodel).subscribe(
      next => {
        this.alertify.success('Loged in sucessfully');
      }, error => {
        this.alertify.error('Log in failed');
      }
    );
  }

  logedIn() {
    return this.authService.logedIn();
  }

  logedOut() {
    const token = localStorage.removeItem('token');
    this.alertify.message('loged out');
  }

}
