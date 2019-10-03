import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith } from 'rxjs/internal/operators/startWith';
import { map } from 'rxjs/internal/operators/map';

@Component({
  selector: 'app-match-add',
  templateUrl: './match-add.component.html',
  styleUrls: ['./match-add.component.css']
})
export class MatchAddComponent implements OnInit {

  matchData = {seasons: '', team1: '', team2: ''};
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
  constructor() {
    this.umpireFilteredOptions = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value1 => this._umpireFilter(value1))
    );
    this.cityFilteredOptions = this.myControl2.valueChanges.pipe(
      startWith(''),
      map(value2 => this._cityFilter(value2))
    );
    this.venueFilteredOptions = this.myControl3.valueChanges.pipe(
      startWith(''),
      map(value3 => this._venueFilter(value3))
    );
  }
doThis() {
  this.umpires = JSON.parse(localStorage.getItem('umpires'));
  console.log("came her");
  
  this.umpireFilteredOptions = this.myControl1.valueChanges.pipe(
    startWith(''),
    map(value1 => this._umpireFilter(value1))
  );

}
  ngOnInit() {


    this.umpires = JSON.parse(localStorage.getItem('umpires'));
    this.venues = JSON.parse(localStorage.getItem('venues'));
    this.cities = JSON.parse(localStorage.getItem('cities'));
    for (let i = 2007 ; i < this.yearEnd; i++) {
      this.years.push(i);
     }
    console.log(this.years);
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
    console.log('leave 3');
    if (this.matchData.team1 !== '' && this.matchData.team2 !== '') {
  console.log('leave one');
  this.playingTeam = [];
  console.log('leave two');
  this.playingTeam.push(this.matchData.team1, this.matchData.team2);
}
  }

  addMatch() {
console.log(this.matchData);

  }

  onValueChange(a: any, b: any) {
b.forEach(element => {
  if (element.toLowerCase().search(a) !== -1) {
this.umpiresFilter.push(element);

  }
});
  }
  onInitial(c: any){

  }

}
