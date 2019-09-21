import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ErrorMsgProviderService } from '../error-msg-provider.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {};
  public errorCode = '';
  public errorMsg = '';

  constructor(private _auth: AuthService,
              private _router: Router,
              private _emsg: ErrorMsgProviderService) { }

  ngOnInit() {
  }

  loginUser() {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token);
        this._router.navigate(['/']);
      },
      err => {
        console.log(err);
        this.errorMsg = this._emsg.errorGenerator(err.error);
      },
    );
  }

  

}
