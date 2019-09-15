import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MatchsService {

  uri = 'http://localhost:4000/matchs';

  constructor(private http: HttpClient) { }

  getMatchs() {
    return this
           .http
           .get(`${this.uri}`);
  }
}
