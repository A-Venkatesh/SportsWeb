import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ErrorMsgProviderService } from '../error-msg-provider.service';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {
  registerUserData = {UserName: '', DOB: ''};
  teams: string[] = ['Rising Pune Supergiant', 'Kings XI Punjab', 'Royal Challengers Bangalore',
   'Delhi Daredevils', 'Mumbai Indians', 'Sunrisers Hyderabad', 'Kolkata Knight Riders', 'Chennai Super Kings'] ;
  errorMsg: string;
   constructor(private _auth: AuthService,
               private _router: Router,
               private _emsg: ErrorMsgProviderService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile() {
    this.registerUserData.UserName = localStorage.getItem('userName');
    this._auth.getProfile(this.registerUserData)
    .subscribe(
      res => {
        console.log(res);
        this.registerUserData = res;
      },
      err => {
        console.log(err);
      }
    );
  }

  registerUser() {
    this.registerUserData.UserName = localStorage.getItem('userName');
    console.log('*****', this.registerUserData);
    if (this.registerUserData.DOB !== '') {
const pos = this.registerUserData.DOB.indexOf('T');
this.registerUserData.DOB = this.registerUserData.DOB.substring(0, pos);

    }
    this._auth.registerProfile(this.registerUserData)
    .subscribe(
      res => {
        this._router.navigate(['/profile']);
      },
      err => {
        console.log('Inga da');
        this.errorMsg = this._emsg.errorGenerator(err.error);
        console.log(err);
      }
    );
  }

}
