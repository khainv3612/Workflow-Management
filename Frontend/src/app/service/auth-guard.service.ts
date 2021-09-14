import {Component, Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {Constant} from "../constant";

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login', {returnUrl: state.url}]);
      return false;
    }
    const currentUser = JSON.parse(<string>window.sessionStorage.getItem(environment.USER_KEY));
    if (route.data.roles && !currentUser.roles.includes(route.data.roles[0])) {
      // role not authorised so redirect to home page
      this.router.navigate(['/error/403']);
      return false;
    }
    return true;
  }
}
