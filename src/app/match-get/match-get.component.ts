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

  selected = '';
  years: number[] = [] ;
  teams: string[] = ['Rising Pune Supergiant','Kings XI Punjab','Royal Challengers Bangalore','Delhi Daredevils','Mumbai Indians','Sunrisers Hyderabad','Kolkata Knight Riders','Chennai Super Kings'] ;
value = 2019;
  displayedColumns: string[] = [ 'season', 'city', 'date', 'team1', 'team2', 'winner', 'venue'];
  matchs: Match[];
  dataSource: any;
  constructor(private ps: MatchsService) { }

  applyFilter(filterValue: string) {
    console.log("check");
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  somethingChanged(){
    console.log(this.selected);
    
    this.applyFilter(this.selected)
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

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
          });

}
}