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

  matchData = {};
  umpires: any;
  venues: any;
  cities: any;
  myControl = new FormControl();
  umpireFilteredOptions: Observable<string[]>;
  constructor() { }

  ngOnInit() {

    this.umpires = JSON.parse(localStorage.getItem('umpires'));
    this.venues = JSON.parse(localStorage.getItem('venues'));
    this.cities = JSON.parse(localStorage.getItem('cities'));
    this.umpireFilteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._umpireFilter(value))
    );
  }
  _umpireFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.umpires.filter(option => this._normalizeValue(option).includes(filterValue));
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }


}
