import { Component, OnInit } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { SignUpService} from '../sign-up.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(private fb: FormBuilder, private us: SignUpService) {
    this.createForm();
  }

  createForm() {
    this.signUpForm = this.fb.group({
      UserName: ['', Validators.required ],
      Password: ['', Validators.required ],
      ConfirmPassword: ['', Validators.required ]
    });
  }
  addUser(UserName, Password) {
    this.us.addUser(UserName, Password);
  }

  ngOnInit() {
  }

}
