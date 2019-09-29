import { Component, OnInit, ViewChild } from '@angular/core';

import Match from '../Match';
import { MatchsService } from '../matchs.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatSort } from '@angular/material/sort';


export interface PeriodicElement {
  id: string; season: string; city: string; date: string; team1: string;
   team2: string; toss_winner: string; toss_decision: string; result: string;
    dl_applied: string; winner: string; win_by_runs: string; win_by_wickets: string; player_of_match: string;
   venue: string; umpire1: string; umpire2: string; umpire3: string; }




@Component({
  selector: 'app-match-get',
  templateUrl: './match-get.component.html',
  styleUrls: ['./match-get.component.css']
})
export class MatchGetComponent implements OnInit {
  umpire = '';
  umpires = [];
  city = '';
  cities = [];
  constructor(private ps: MatchsService) { }

  selected = '';
  years: number[] = [] ;
  venue = '';
  venues = [];
  teams: string[] = ['Rising Pune Supergiant', 'Kings XI Punjab', 'Royal Challengers Bangalore', 'Delhi Daredevils', 'Mumbai Indians', 'Sunrisers Hyderabad', 'Kolkata Knight Riders', 'Chennai Super Kings'] ;
value = 2019;
  displayedColumns: string[] = [ 'season', 'city', 'date', 'team1', 'team2', 'winner', 'venue'];
  matchs: Match[];
  dataSource: any;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  applyFilter(filterValue: string) {
    console.log('check');
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  somethingChanged() {
    console.log(this.selected);

    this.applyFilter(this.selected);
  }

  ngOnInit() {
    for (let i = 2007 ; i < this.value; i++) {
      this.years.push(i);
     }
    this.ps
      .getMatchs()
      .subscribe((data: PeriodicElement[]) => {
        this.matchs = data;

        this.dataSource = new MatTableDataSource<PeriodicElement>(data);

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;


        this.runCheck(this.matchs);
        console.log(this.umpires);
        localStorage.setItem('umpires',  JSON.stringify(this.umpires));
        localStorage.setItem('venues', JSON.stringify(this.venues));
        localStorage.setItem('cities', JSON.stringify(this.cities));

          });


}

runCheck(matchs) {
  this.matchs.forEach(value => {
    this.getRow(value);
    });
}

getRow(row) {
  if (this.venue.search(row.venue) === -1) {
    this.venue = this.venue.concat(row.venue.concat(' ,'));
    this.venues.push(row.venue);
  }
  if (this.umpire.search(row.umpire1) === -1) {
    this.umpire = this.umpire.concat(row.umpire1.concat(' ,'));
    this.umpires.push(row.umpire1);
  }
  if (this.umpire.search(row.umpire2) === -1) {
    this.umpire = this.umpire.concat(row.umpire2.concat(' ,'));
    this.umpires.push(row.umpire2);
  }
  if (this.umpire.search(row.umpire3) === -1) {
    this.umpire = this.umpire.concat(row.umpire3.concat(' ,'));
    this.umpires.push(row.umpire3);
  }
  if (this.city.search(row.city) === -1) {
    this.city = this.city.concat(row.city.concat(' ,'));
    this.cities.push(row.city);
  }

}
}
