import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ErrorMsgProviderService } from '../error-msg-provider.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  errorMsg: any;
  constructor(private _auth: AuthService,
              private _router: Router,
              private _emsg: ErrorMsgProviderService) { }

  registerUserData = {}

  ngOnInit() {
  }
  registerUser() {
    console.log(this.registerUserData);
    this._auth.registerUser(this.registerUserData)
    .subscribe(
      res => {
        localStorage.setItem('token', res.token)
        this._router.navigate(['/'])
      },
      err => {
        this.errorMsg = this._emsg.errorGenerator(err.error);
        console.log(err)
      }
    )
  }


}
