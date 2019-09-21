import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators'
import { throwError } from 'rxjs';

@Injectable()
export class AuthService {

  private _registerUrl = 'http://localhost:4000/users/register';
  private _loginUrl = 'http://localhost:4000/users/login';

  constructor(private http: HttpClient,
              private _router: Router) { }

  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user);
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user).pipe(catchError(this.handleError));
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
