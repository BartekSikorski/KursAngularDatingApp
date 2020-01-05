import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthService } from '../_services/Auth.service';
import { AletifyService } from '../_services/aletify.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public authService: AuthService, public router: Router, public alertify: AletifyService) {  }

  canActivate(): boolean {

   if (this.authService.logedIn()) {
     return true;
   }

   this.alertify.message('You shall not pass !!!');
   this.router.navigate(['home']);
   return false;
  }
}