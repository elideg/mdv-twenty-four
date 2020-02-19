import { NotifyService } from './../notify.service';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  constructor(
    private route: Router,
    private authService: AuthService,
    private notify: NotifyService
    ) { }

  canActivate() {
    if(!this.authService.isAuthenticated.value) {
      this.notify.notify('Invaild User');
      return false
    } else {
      this.notify.notify('Succesfully Logged In');
      return true;
    }
  }
}
