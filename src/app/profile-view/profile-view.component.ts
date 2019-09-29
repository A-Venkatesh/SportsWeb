import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.css']
})
export class ProfileViewComponent implements OnInit {
 fullData = {UserName: ''}
constructor(private _auth: AuthService) { }

ngOnInit() {
  this.getProfile();
  }


  getProfile() {
    this.fullData.UserName = localStorage.getItem('userName');
    this._auth.getProfile(this.fullData)
    .subscribe(
      res => {
        console.log(res);
        this.fullData = res;
      },
      err => {
        console.log(err);
      }
    )
  }
}
