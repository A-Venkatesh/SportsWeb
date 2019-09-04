import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  uri = 'http://localhost:4000/products';

  constructor(private http: HttpClient) { }

  addUser(UserName, Password) {
    const obj = {
      UserName,
      Password
    };
    console.log(obj);
    this.http.post(`${this.uri}/registration`, obj)
        .subscribe(res => console.log('Done'));
  }

}
