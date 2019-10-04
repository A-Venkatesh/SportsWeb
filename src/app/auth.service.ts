import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {

  private _userUrl = 'http://localhost:4000/users/';
  private _profileUrl = 'http://localhost:4000/profile/';
  private _matchUrl = 'http://localhost:4000/matchs/';


  constructor(private http: HttpClient,
              private _router: Router) { }
  registerProfile(profile) {
    return this.http.post<any>(this._profileUrl.concat('update'), profile);
  }
  getProfile(profile) {
    return this.http.post<any>(this._profileUrl.concat('get'), profile);
  }
  registerUser(user) {
    return this.http.post<any>(this._userUrl.concat('register'), user);
  }

  loginUser(user) {
    return this.http.post<any>(this._userUrl.concat('login'), user).pipe(catchError(this.handleError));
  }
  addMatch(match) {
    return this.http.post<any>(this._matchUrl.concat('add'), match);
  }

  handleError(error: HttpErrorResponse) {
    console.log('lalalalalalalala');
    return throwError(error);
    }

  logoutUser() {
    localStorage.removeItem('token');
    this._router.navigate(['/']);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }
}
