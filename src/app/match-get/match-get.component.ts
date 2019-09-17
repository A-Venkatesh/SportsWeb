import { Component, OnInit, ViewChild } from '@angular/core';

import Match from '../Match';
import { MatchsService } from '../matchs.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


export interface PeriodicElement {
  season: string;
     city: string;
     date: string; team1: string; team2: string; winner: string; venue: string;
}




@Component({
  selector: 'app-match-get',
  templateUrl: './match-get.component.html',
  styleUrls: ['./match-get.component.css']
})
export class MatchGetComponent implements OnInit {

  selected = 'All seasons';
  years: number[] = [] ;
value = 2019;
  displayedColumns: string[] = [ 'season ', ' city ', ' date ', ' team1 ', ' team2 ', ' winner ', ' venue '];
  matchs: Match[];
  dataSource: any;
  constructor(private ps: MatchsService) { }


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    for (let i = 2007 ; i < this.value; i++) {
      this.years.push(i);
     }
    this.ps
      .getMatchs()
      .subscribe((data: Match[]) => {
        this.matchs = data;
        this.dataSource = new MatTableDataSource<PeriodicElement>(data);
          });

    this.dataSource.paginator = this.paginator;
  }


}