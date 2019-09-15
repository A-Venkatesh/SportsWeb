import { Component, OnInit, ViewChild } from '@angular/core';

import Match from '../Match';
import { MatchsService } from '../matchs.service';

import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';



@Component({
  selector: 'app-match-get',
  templateUrl: './match-get.component.html',
  styleUrls: ['./match-get.component.css']
})
export class MatchGetComponent implements OnInit {
  displayedColumns: string[] = [ 'season ', ' city ', ' date ', ' team1 ', ' team2 ', ' winner ', ' venue '];

  matchs: Match[];
  constructor(private ps: MatchsService) { }
  dataSource = new MatTableDataSource(this.matchs);

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.ps
      .getMatchs()
      .subscribe((data: Match[]) => {
        this.matchs = data;
        this.dataSource.data = data;
        console.log(this.dataSource);
          });
    this.dataSource.paginator = this.paginator;
  }


}
