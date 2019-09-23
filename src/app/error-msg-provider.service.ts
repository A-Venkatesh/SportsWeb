import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorMsgProviderService {

  errorMsg: string;

  constructor() { }

  errorGenerator(errorCode: string) {
    switch (errorCode) {
      case 'Invalid User Name': {
         this.errorMsg = 'Account not found. Please check the UserName';
         break;
      }
      case 'Invalid Password': {
        this.errorMsg = 'Incorrect Password. Please reenter the password';
        break;
      }
      case 'UserName Exist':{
        this.errorMsg = 'UserName already exist. Please try someother username';
        break;
      }
      default: {
        this.errorMsg = '';
        break;
      }
   }
    return this.errorMsg;
  }
}
