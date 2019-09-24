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
  registerUserData = {}
  teams: string[] = ['Rising Pune Supergiant', 'Kings XI Punjab', 'Royal Challengers Bangalore',
   'Delhi Daredevils', 'Mumbai Indians', 'Sunrisers Hyderabad', 'Kolkata Knight Riders', 'Chennai Super Kings'] ;
   constructor(private _auth: AuthService,
    private _router: Router,
    private _emsg: ErrorMsgProviderService) { }

  ngOnInit() {
  }

  registerUser() {
    console.log(this.registerUserData);
    this._auth.registerProfile(this.registerUserData)
    .subscribe(
      res => {
        this._router.navigate(['/profile'])
      },
      err => {
        this.errorMsg = this._emsg.errorGenerator(err.error);
        console.log(err)
      }
    )
  }

}
