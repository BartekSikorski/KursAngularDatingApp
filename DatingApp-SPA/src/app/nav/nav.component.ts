import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/Auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  authmodel: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.authmodel).subscribe(
      next => {
        console.log('Loged in sucessfully');
      }, error => {
        console.log('Log in failed');
      }
    );
  }

  logedIn() {
    const token = localStorage.getItem('token');
    return !! token;
  }

  logedOut() {
    const token = localStorage.removeItem('token');
    console.log('loged out');
  }

}
