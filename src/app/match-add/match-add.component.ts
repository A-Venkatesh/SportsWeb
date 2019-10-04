import { Component, OnInit } from '@angular/core';
import { forwardRef, HostBinding, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-match-add',
  templateUrl: './match-add.component.html',
  styleUrls: ['./match-add.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => MatchAddComponent),
      multi: true
    }
  ]
})
export class MatchAddComponent implements OnInit {

  matchData = {seasons: '', team1: '', team2: '', date: ''};
  umpires: any;
  umpiresFilter: string[] = [''];
  venues: any;
  cities: any;
  myControl1 = new FormControl();
  myControl2 = new FormControl();
  myControl3 = new FormControl();

  umpireFilteredOptions: Observable<string[]>; cityFilteredOptions: Observable<string[]>; venueFilteredOptions: Observable<string[]>;
  years: number[] = [];
  yearEnd = 2019;
  teams: string[] = ['Rising Pune Supergiant', 'Kings XI Punjab', 'Royal Challengers Bangalore', 'Delhi Daredevils',
   'Mumbai Indians', 'Sunrisers Hyderabad', 'Kolkata Knight Riders', 'Chennai Super Kings'] ;
  playingTeam = [];
  constructor(private _auth: AuthService,
              private _router: Router) {

  }

  form = new FormGroup({
    umpire1: new FormControl(this.umpires),
    umpire2: new FormControl(this.umpires),
    umpire3: new FormControl(this.umpires),
    venue: new FormControl(this.venues),
    city: new FormControl(this.cities),
  });
doThis() {
  this.umpires = JSON.parse(localStorage.getItem('umpires'));

  this.umpireFilteredOptions = this.myControl1.valueChanges.pipe(
    startWith(''),
    map(value1 => this._umpireFilter(value1))
  );

}

onTouchedUmpire() {
  this.umpireFilteredOptions = this.myControl1.valueChanges.pipe(
    startWith(''),
    map(value1 => this._umpireFilter(value1))
  );
}
onTouchedCity() {
  this.cityFilteredOptions = this.myControl2.valueChanges.pipe(
    startWith(''),
    map(value2 => this._cityFilter(value2))
  );

}
onTouchedVenue() {
  this.venueFilteredOptions = this.myControl3.valueChanges.pipe(
    startWith(''),
    map(value3 => this._venueFilter(value3))
  );
}
  ngOnInit() {


    this.umpires = JSON.parse(localStorage.getItem('umpires'));
    this.venues = JSON.parse(localStorage.getItem('venues'));
    this.cities = JSON.parse(localStorage.getItem('cities'));
    for (let i = 2007 ; i < this.yearEnd; i++) {
      this.years.push(i);
     }
  }
  _umpireFilter(value: string): string[] {
    const filterValue1 = value.toLowerCase();

    return this.umpires.filter(option1 => this._normalizeValue(option1).includes(filterValue1));
  }
  _cityFilter(value: string): string[] {
    const filterValue2 = value.toLowerCase();

    return this.cities.filter(option2 => this._normalizeValue(option2).includes(filterValue2));
  }
  _venueFilter(value: string): string[] {
    const filterValue3 = value.toLowerCase();

    return this.venues.filter(option3 => this._normalizeValue(option3).includes(filterValue3));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  tossedTeam() {
    if (this.matchData.team1 !== '' && this.matchData.team2 !== '') {
  this.playingTeam = [];
  this.playingTeam.push(this.matchData.team1, this.matchData.team2);
}
  }

  addMatch() {
console.log(this.matchData);
const pos = this.matchData.date.indexOf('T');
this.matchData.date = this.matchData.date.substring(0, pos);
this._auth.addMatch(this.matchData)
    .subscribe(
      res => {
        this._router.navigate(['/']);
      },
      err => {
        console.log(err);
      }
    );

  }

  onValueChange(a: any, b: any) {
b.forEach(element => {
  if (element.toLowerCase().search(a) !== -1) {
this.umpiresFilter.push(element);

  }
});
  }
  onInitial(c: any) {

  }

}
