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
  venues: any;
  cities: any;
  myControl = new FormControl();
  umpireFilteredOptions: Observable<string[]>; cityFilteredOptions: Observable<string[]>;
  years: number[] = [];
  yearEnd = 2019;
  teams: string[] = ['Rising Pune Supergiant', 'Kings XI Punjab', 'Royal Challengers Bangalore', 'Delhi Daredevils',
   'Mumbai Indians', 'Sunrisers Hyderabad', 'Kolkata Knight Riders', 'Chennai Super Kings'] ;
  playingTeam = [];
  constructor() { }

  ngOnInit() {


    this.umpires = JSON.parse(localStorage.getItem('umpires'));
    this.venues = JSON.parse(localStorage.getItem('venues'));
    this.cities = JSON.parse(localStorage.getItem('cities'));
    for (let i = 2007 ; i < this.yearEnd; i++) {
      this.years.push(i);
     }
    console.log(this.years);
    this.umpireFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._umpireFilter(value))
    );
    this.cityFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._cityFilter(value))
    );
  }
  _umpireFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.umpires.filter(option => this._normalizeValue(option).includes(filterValue));
  }
  _cityFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.cities.filter(option => this._normalizeValue(option).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


  tossedTeam() {
    console.log('leave 3');
if (this.matchData.team1 !== '' && this.matchData.team2 !== '') {
  console.log('leave one');
  this.playingTeam =[];
    console.log('leave two');
    this.playingTeam.push(this.matchData.team1, this.matchData.team2);
}
  }

}
