import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {JwtHelperService, JWT_OPTIONS} from '@auth0/angular-jwt';
import {TokenStorageService} from './token-storage.service';
import {environment} from '../../environments/environment';
import {User} from '../model/User';
import {Router} from "@angular/router";

const AUTH_API = environment.URL_API_AUTH;
const TOKEN_KEY = environment.TOKEN_KEY;
const USER_KEY = environment.USER_KEY;


const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  private session: Storage;

  constructor(
    private http: HttpClient, public jwtHelper: JwtHelperService,
    private tokenService: TokenStorageService, private router: Router) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(<string>window.sessionStorage.getItem(environment.USER_KEY)));
    this.currentUser = this.currentUserSubject.asObservable();
    this.session = window.sessionStorage;
  }

  public currentUserValue(): User {
    return JSON.parse(<string>this.session.getItem(environment.USER_KEY)
    )
      ;
  }

  login(username: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      username,
      email,
      password
    }, httpOptions);
  }

  public isAuthenticated(): boolean {
    if (this.checkIsRemember()) {
      return true;
    }
    const token = this.tokenService.getToken();
    if (null == token) {
      return false;
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  public checkIsRemember(): boolean {
    if (null != this.session.getItem('isRememberMe') && null != this.session.getItem(environment.USER_KEY)) {
      const user = JSON.parse(<string>this.session.getItem(environment.USER_KEY));
      this.tokenService.saveToken(user.accessToken);
      this.tokenService.saveUser(this.session.getItem(environment.USER_KEY));
      return true;
    }
    return false;
  }

  public logout(): void {
    this.session.removeItem(TOKEN_KEY);
    this.session.removeItem(USER_KEY);
    // this.socialService.signOut();//social login
    this.router.navigateByUrl('/');
  }
}
